import {Configuration, OpenAIApi} from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
	apiKey: process.env['OPENAI_API_KEY'],
});

const openai = new OpenAIApi(configuration);

export default async function chat(
	question: string,
): Promise<{error: {message: string} | undefined; result: string | undefined}> {
	console.log({question});
	if (!configuration.apiKey) {
		return {
			error: {
				message: 'OpenAI API key not configured!',
			},
			result: undefined,
		};
	}

	if (question.trim().length === 0) {
		return {
			error: {
				message: 'Please enter a valid question',
			},
			result: undefined,
		};
	}

	try {
		const completion = await openai.createCompletion({
			model: 'gpt-3.5-turbo',
			prompt: generatePrompt(question),
			temperature: 0.6,
		});

		return {result: completion.data.choices.at(0)?.text, error: undefined};
	} catch (error: any) {
		// Consider adjusting the error handling logic for your use case
		if (error.response) {
			console.error(error.response.status, error.response.data);
			return {
				error: {
					message: error.response.data.error.message,
				},
				result: undefined,
			};
		} else {
			console.error(`Error with OpenAI API request: ${error.message}`);
			return {
				error: {
					message: 'An error occurred during your request.',
				},
				result: undefined,
			};
		}
	}
}

function generatePrompt(question: string) {
	return `system: You are a helpful assistant.
user: Who won the world series in 2020?
assistant: The Los Angeles Dodgers won the World Series in 2020.
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
user: ${question}
assistant:`;
}
