import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import TextInput from 'ink-text-input';
import BigText from 'ink-big-text';
import Spinner from 'ink-spinner';

type Props = {
	chat: boolean;
};

export default function App({chat}: Props) {
	if (!chat) return <></>;
	return <Interface />;
}

const Interface = () => {
	const [question, setQuestion] = useState('');
	const [isGptThinking, setIsGptThinking] = useState(false);
	useInput((_, key) => {
		if (key.return) {
			setQuestion('');
			setIsGptThinking(true);
			//do the api request to openapi and after processesing format the output and
			//show the ouput
			setTimeout(() => {
				setIsGptThinking(false);
			}, 5000);
		}
	});

	return (
		<Box display="flex" flexDirection="column">
			<BigText colors={['green']} text="GPT CLI" />
			<Box marginLeft={20} marginBottom={2}>
				<Text>
					Chat GPT in you{' '}
					<Text italic color="blueBright">
						cli
					</Text>
				</Text>
			</Box>
			{isGptThinking ? (
				<Text>
					<Text color="green">
						<Spinner type="circleHalves" />
					</Text>
					{' GPT is thinking....'}
				</Text>
			) : (
				<Box display="flex">
					<Text color={'greenBright'}>User: </Text>
					<TextInput
						placeholder="Ask a interesting question."
						onChange={q => setQuestion(q)}
						value={question}
					/>
				</Box>
			)}
		</Box>
	);
};
