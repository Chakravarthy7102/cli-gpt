#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';

import App from './app.js';

meow(
	`
	Usage
	  $ cli-gpt

	Options
		--chat

	Examples
	  $ cli-gpt --chat
	     (or just)
	  $ cli-gpt
`,
	{
		importMeta: import.meta,
		flags: {
			chat: {
				default: true,
				isRequired: true,
				type: 'boolean',
			},
		},
	},
);

const main = async () => {
	const app = render(<App />);
	//run the program until the user interupts the program with a sigterm signal.
	await app.waitUntilExit();
};

main();
