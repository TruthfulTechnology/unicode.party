# Unicode Party

[![Build Status](https://travis-ci.org/TruthfulTechnology/unicode.party.svg?branch=master)](https://travis-ci.org/TruthfulTechnology/unicode.party)
[![Code Climate](https://codeclimate.com/github/TruthfulTechnology/unicode.party/badges/gpa.svg)](https://codeclimate.com/github/TruthfulTechnology/unicode.party)
[![codecov.io](http://codecov.io/github/TruthfulTechnology/unicode.party/coverage.svg?branch=master)](http://codecov.io/github/TruthfulTechnology/unicode.party?branch=master)

This README outlines the details of collaborating on this Ember application.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* Set `AWS_KEY` and `AWS_SECRET` environment variables
* Run `ember deploy -prod`

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Helpful Shell Aliases

For a more enjoyable workflow add these aliases to your `.zshrc`, `.bashrc`, etc.

    alias 🐹=ember
    alias emoji=ember

This will allow you to use `emoji` or `🐹` instead of `ember`:

    🐹 serve
    🐹 test
    🐹 deploy
    emoji serve
    emoji test
    emoji deploy

## Technologies Used

- [Ember.js][] and [ember-cli][]
- [emojilib][]
- [Susy][]
- [Sass][]
- [Babel][]

[ember.js]: http://emberjs.com/
[ember-cli]: http://www.ember-cli.com/
[susy]: http://susy.oddbird.net/
[sass]: http://sass-lang.com
[babel]: https://babeljs.io/

## License

Code released under an [MIT Licensed](http://th.mit-license.org/).
