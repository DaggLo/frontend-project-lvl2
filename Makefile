install:
	npm install

start:
	npx babel-node src/bin/brain-games.js

build:
	npm run build

lint:
	npx eslint .

publish:
	npm publish --dry-run
