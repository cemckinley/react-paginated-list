# Paginated List With React.js

Demo of React.js in the form of a paginated list that pulls crime report data from data.seattle.gov. Uses Grunt for local dev and browserify for JS modules.

## Base Dependencies
- node/npm (http://nodejs.org/)]
- grunt-cli (http://gruntjs.com/getting-started)
- ruby (already installed on OSX)


## Project Installation - NPM
This project can be installed locally using npm. After checking the project out from source control, `cd` to the root directory where package.json is located, and `npm install`.


## Using grunt in the Terminal
`cd` to the trunk directory with the Gruntfile.js and use the following commands:

- `grunt run` : runs a local static server with automatic live-reloading on port http://localhost:8001. Lints javascript, runs browserify and react compilation, and starts a static server. Watches all files for changes.