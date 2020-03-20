@retailmenot/common-handlebars-helpers
======================================


[![Build Status](https://travis-ci.org/RetailMeNotSandbox/common-handlebars-helpers.svg?branch=master)](https://travis-ci.org/RetailMeNotSandbox/common-handlebars-helpers)

> common, general purpose handlebars helpers used by RetailMeNot applications

## Quickstart

```sh
$ npm install --save @retailmenot/common-handlebars-helpers
```

Then, in your application:

```js
const commonHelpers = require('@retailmenot/common-handlebars-helpers')
const handlebars = require('handlebars')

handlebars.registerHelper(commonHelpers)
```


## Webpack

For use in the browser via webpack, use the [`handlebars-loader`] module add
this package's `helpers` directory to the `helpersDir` config array:

```js
// webpack.config.js
const path = require('path')
const handlebarsLoader = require('handlebars-loader')

const moduleDirectory = path.dirname(require.resolve('@retailmenot/common-handlebars-helpers'))
const helpersDirectory = path.join(moduleDirectory, 'helpers')

module.exports = {

  // entry, output ...

  module: {
    loaders: [{
      test: /\.hbs$/,
      loader: handlebarsLoader,
      query: {
        helperDirs: [
          helpersDirectory
        ]
      }
    }]
  }
}
```


[`handlebars-loader`]: https://github.com/pcardune/handlebars-loader
