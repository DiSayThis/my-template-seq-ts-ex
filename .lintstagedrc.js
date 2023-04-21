import path from 'path';

const nextLintFixCommand = (filenames) =>
	`npx eslint --fix  ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const prettierWriteCommand = (filenames) =>
	`npx prettier --write ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const gitAddCommand = (filenames) => `git add ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

export default {
	'*.{js,jsx,ts,tsx,json}': [prettierWriteCommand, nextLintFixCommand, gitAddCommand],
};
