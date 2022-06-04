# Unicode Party

[![Build Status](https://travis-ci.org/TruthfulTechnology/unicode.party.svg?branch=master)](https://travis-ci.org/TruthfulTechnology/unicode.party)
[![Code Climate](https://codeclimate.com/github/TruthfulTechnology/unicode.party/badges/gpa.svg)](https://codeclimate.com/github/TruthfulTechnology/unicode.party)
[![codecov.io](http://codecov.io/github/TruthfulTechnology/unicode.party/coverage.svg?branch=master)](http://codecov.io/github/TruthfulTechnology/unicode.party?branch=master)

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Running / Development

* `npm run dev`
* Visit your app at [http://localhost:3000](http://localhost:3000).

### Building

* `npm run build`
* `npm run preview`

### Running Tests

Testing is currently done manually.

After each change please test the following:

* Rendering looks good with these resolutions (using Chrome device toggle)
  * 1920x1080: shows 4 tiles per row
  * 1280x720: shows 4 tiles per row
  * 1024x768: shows 2 tiles per row
  * 820x1180 (iPad Air): shows 2 tiles per row
  * 375x667 (iPhone SE): shows 1 tile per row
* When page loads, input field is selected
* Hitting Enter key toggles between focused & selected input and blurred input
* When page loads with `?query=` in URL, the input is pre-filled and selected
* When typing into input field, tiles filter down and `?query=` in URL changes

## License

Code released under an [MIT Licensed](http://th.mit-license.org/).
