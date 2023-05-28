import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';
import chat from './api.js';


export default function App() {
	return <Interface />;
}

const Interface = () => {
	const [question, setQuestion] = useState('');
	const [error, setError] = useState('');
	const [gptAnswer, setGptAnswer] = useState('');
	const [isGptThinking, setIsGptThinking] = useState(false);
	useInput((_, key) => {
		if (key.return) {
			
			setIsGptThinking(true);
			setTimeout(async () => {
				const response = await chat(question);
				setQuestion('');

				if (response.error) {
					setError(response.error.message);
				}

				if (response.result) {
					setGptAnswer(response.result);
				}

				setIsGptThinking(false);
			}, 2000);
		}
	});

	let innerJsx = <></>;

	if (isGptThinking) {
		innerJsx = (
			<Text>
				<Text color="green">
					<Spinner type="circleHalves" />
				</Text>
				{' GPT is thinking....'}
			</Text>
		);
	} else if (gptAnswer) {
		innerJsx = (
			<Box display="flex">
				<Text color="redBright">gpt: </Text>
				<Text color="yellowBright">{gptAnswer}</Text>
			</Box>
		);
	} else {
		innerJsx = (
			<Box display="flex" gap={3} flexDirection="column">
				{error ? (
					<Text underline bold color="redBright">
						<Text color="yellowBright">Error: </Text> {error}
					</Text>
				) : null}

				<Box>
					<Text color={'greenBright'}>user: </Text>
					<TextInput
						placeholder="Ask a interesting question."
						onChange={q => setQuestion(q)}
						value={question}
					/>
				</Box>
			</Box>
		);
	}

	return (
		<Box display="flex" flexDirection="column">
			<BigText colors={['green']} text="GPT CLI" />
			<Box marginLeft={20} marginBottom={2}>
				<Text>
					Chat GPT in your{' '}
					<Text italic color="blueBright">
						cli
					</Text>
				</Text>
			</Box>
			{innerJsx}
		</Box>
	);
};
