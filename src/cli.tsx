#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ my-ink-cli

	Options
		--name  Your name

	Examples
	  $ my-ink-cli --name=Jane
	  Hello, Jane
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
	const app = render(<App chat={cli.flags.chat} />);
	//run the program until the user interupts the program with a sigterm signal.
	await app.waitUntilExit();
};

main();
