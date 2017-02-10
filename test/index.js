'use strict'

var create = require('handlebars').create
var fs = require('fs')
var helpers = require('..')
var path = require('path')
var should = require('should')

/* eslint no-unused-vars: ["error", { "vars": "local" }] */
/* global beforeEach, describe, it */

describe('@retailmenot/common-handlebars-helpers', function () {
  var handlebars

  beforeEach(function () {
    handlebars = create()
    handlebars.registerHelper(helpers)
  })

  describe('helpers/ directory exists', function () {
    var directoryExists = fs.existsSync(path.resolve('helpers'))
    it('should exist, its mentioned in the README!', function () {
      should(directoryExists).equal(true)
    })
  })

  describe('modChoose', function () {
    describe('when given invalid number of positional arguments', function () {
      it('should throw (0 when 2 were expected)', function () {
        (function () {
          handlebars.compile('{{modChoose}}')()
        }).should.throw()
      })

      it('should throw (1 when 2 were expected)', function () {
        (function () {
          handlebars.compile('{{modChoose 1}}')()
        }).should.throw()
      })
    })

    describe('when given named arguments', function () {
      it('should do nothing with them (1 when 0 were expected)', function () {
        (function () {
          handlebars.compile('{{modChoose 1 "a" bad="namedArg"}}')()
        }).should.be.ok()
      })
    })

    describe('when given invalid number of positional arguments _and_ named arguments', function () {
      it('should throw (0 positional when 2 were expected)', function () {
        (function () {
          handlebars.compile('{{modChoose bad="namedArg" and="anotherOne}}')()
        }).should.throw()
      })
    })

    describe('when given valid arguments', function () {
      it('should return first argument when only one given and dividend is 0', function () {
        should(handlebars.compile('{{modChoose 0 "A"}}')()).equal('A')
      })

      it('should return first argument when only one given and dividend is 1', function () {
        should(handlebars.compile('{{modChoose 1 "A"}}')()).equal('A')
      })

      it('should return first argument when only one given and dividend is even', function () {
        should(handlebars.compile('{{modChoose 100 "A"}}')()).equal('A')
      })

      it('should return first argument when only one given and dividend is odd', function () {
        should(handlebars.compile('{{modChoose 101 "A"}}')()).equal('A')
      })

      it('should return first argument when two given and dividend is 0', function () {
        should(handlebars.compile('{{modChoose 0 "even" "odd"}}')()).equal('even')
      })

      it('should return first argument when two given and dividend is string "0"', function () {
        should(handlebars.compile('{{modChoose "0" "even" "odd"}}')()).equal('even')
      })

      it('should return first argument when two given and dividend is even', function () {
        should(handlebars.compile('{{modChoose 100 "even" "odd"}}')()).equal('even')
      })

      it('should return second argument when two given and dividend is 1', function () {
        should(handlebars.compile('{{modChoose 1 "even" "odd"}}')()).equal('odd')
      })

      it('should return second argument when two given and dividend is string "1"', function () {
        should(handlebars.compile('{{modChoose "1" "even" "odd"}}')()).equal('odd')
      })

      it('should return second argument when two given and dividend is odd', function () {
        should(handlebars.compile('{{modChoose 101 "even" "odd"}}')()).equal('odd')
      })

      it('should return nth argument when x given and dividend is n', function () {
        should(handlebars.compile('{{modChoose 2 "zero" "one" "two" "three" "four"}}')()).equal('two')
      })

      it('should return nth argument when x given and dividend is n + x', function () {
        should(handlebars.compile('{{modChoose 7 "zero" "one" "two" "three" "four"}}')()).equal('two')
      })

      it('should generate banded even/odd rows for @index inside of an each loop', function () {
        should(handlebars.compile([
          '<ol>',
          '{{#each myArr}}',
          '<li class="{{modChoose @index "even" "odd"}}">{{this}}</li>',
          '{{/each}}',
          '</ol>'
        ].join(''))({
          myArr: ['A', 'B', 'C', 'D']
        })).equal([
          '<ol>',
          '<li class="even">A</li>',
          '<li class="odd">B</li>',
          '<li class="even">C</li>',
          '<li class="odd">D</li>',
          '</ol>'
        ].join(''))
      })
    })
  })

  describe('join', function () {
    describe('when given invalid number of positional arguments', function () {
      it('should throw (0 when 1 or 2 were expected)', function () {
        (function () {
          handlebars.compile('{{join}}')()
        }).should.throw()
      })

      it('should throw (0 positional when 1 or 2 were expected and named argument "glue" is provided")', function () {
        (function () {
          handlebars.compile('{{join glue="myGlue"}}')()
        }).should.throw()
      })

      it('should throw (0 positional when 1 or 2 were expected and named argument "glue" is not provided")', function () {
        (function () {
          handlebars.compile('{{join bad="namedArg" and="anotherOne}}')()
        }).should.throw()
      })

      it('should throw (3 when 1 or 2 were expected and first arg is an array)', function () {
        (function () {
          handlebars.compile('{{join myArr "b" "c"}}')({
            myArr: []
          })
        }).should.throw()
      })
    })

    describe('when given valid arguments', function () {
      it('should return empty string when first arg is empty list and no glue specified', function () {
        should(handlebars.compile('{{join myArr}}')({
          myArr: []
        })).equal('')
      })

      it('should return empty string when first arg is empty list and glue specified', function () {
        should(handlebars.compile('{{join myArr "-"}}')({
          myArr: []
        })).equal('')
      })

      it('should return empty string when first arg is empty string and no glue specified', function () {
        should(handlebars.compile('{{join myStr}}')({
          myStr: ''
        })).equal('')
      })

      it('should return empty string when first arg is empty string and glue specified', function () {
        should(handlebars.compile('{{join myStr glue="-"}}')({
          myStr: ''
        })).equal('')
      })

      it('should return first item when first arg is array containing one item and no glue specified', function () {
        should(handlebars.compile('{{join myArr}}')({
          myArr: ['a']
        })).equal('a')
      })

      it('should return first item when first arg is array containing one item and glue specified', function () {
        should(handlebars.compile('{{join myArr "-"}}')({
          myArr: ['a']
        })).equal('a')
      })

      it('should return first arg when first arg is string and no glue specified', function () {
        should(handlebars.compile('{{join myStr}}')({
          myStr: 'a'
        })).equal('a')
      })

      it('should return first arg when first arg is string and glue specified', function () {
        should(handlebars.compile('{{join myStr glue="-"}}')({
          myStr: 'a'
        })).equal('a')
      })

      it('should return string of all items separated by space when first arg is array and no glue specified', function () {
        should(handlebars.compile('{{join myArr}}')({
          myArr: ['a', 'b', 'c']
        })).equal('a b c')
      })

      it('should return string of all items separated by specified glue when first arg is array', function () {
        should(handlebars.compile('{{join myArr "-"}}')({
          myArr: ['a', 'b', 'c']
        })).equal('a-b-c')
      })

      it('should return string of all items separated by space when first arg is string and no glue specified', function () {
        should(handlebars.compile('{{join myStr "b" "c"}}')({
          myStr: 'a'
        })).equal('a b c')
      })

      it('should return string of all items separated by specified glue when first arg is string', function () {
        should(handlebars.compile('{{join myStr "b" "c" glue="-"}}')({
          myStr: 'a'
        })).equal('a-b-c')
      })

      it('should return string of all items separated by specified glue when first arg is string and glue is dynamic', function () {
        should(handlebars.compile('{{join myStr "b" "c" glue=myDelim}}')({
          myStr: 'a',
          myDelim: '-'
        })).equal('a-b-c')
      })
    })
  })
})
