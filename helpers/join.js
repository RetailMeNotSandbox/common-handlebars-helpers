'use strict'

// handlebars helpers have variable argument lists and eslint & jsdoc don't play nice with these
/* eslint no-unused-vars: ["error", { "args": "none" }] */

/**
 * Joins either an array or `n` positional strings and returns the resulting string. Useful for
 * turning `ClassList` arrays into strings.
 *
 * If the first argument is an array and the second argument, `glue`, is specified, the resulting
 * string will be formed by joining items from the array with `glue` as the delimiter.
 *
 * eg: given `someArray === ['A', 'B', 'C', 'D']`
 * ```hbs
 * {{join someArray}} <!-- "A B C D" -->
 *
 * {{join someArray "-"}} <!-- "A-B-C-D" -->
 * ```
 *
 * If the first argument is _not_ an array and the named argument, `glue`, is specified, the
 * resulting string will be formed by joining all positional arguments with `glue` as the delimiter.
 *
 * eg: given `someString === 'A B']`
 * ```hbs
 * {{join someString}} <!-- "A B" -->
 *
 * {{join someString "C" "D"}} <!-- "A B C D" -->
 *
 * {{join "C" "D" "E" glue=someString}} <!-- "CA BDA BE" -->
 * ```
 *
 * In both cases, if `glue` is omitted, a single whitespace is used instead.
 *
 * @param {Array|String} toJoin - array of items to be joined, or first positional string to be joined
 * @param {...String} [moreToJoin] - `n` additional strings to be joined
 * @param {String} [glue] - glue to use as string delimiter
 *
 * @throws {TypeError} Will throw if incorrect number of positional args supplied
 * @returns {String}
 */
module.exports = function join (toJoin, moreToJoin, glue /* , options */) {
  var args = Array.prototype.slice.apply(arguments)
  var argc = args.length - 1 // last argument is always 'options'
  var namedArgs = args[argc].hash
  var _glue = ' '
  var list = []
  var isListArray = argc > 0 && Object.prototype.toString.call(args[0]) === '[object Array]'

  if (argc === 0 || (argc > 2 && isListArray)) {
    throw new TypeError(
      'join requires at least one positional argument. If the first argument is an array, ' +
      'then only 1 additional argument is allowed the string to use as the delimiter between items.'
    )
  }

  if (isListArray) {
    list = toJoin

    if (argc === 2) {
      _glue = moreToJoin
    }
  } else {
    list = args.slice(0, argc)

    if ('glue' in namedArgs) {
      _glue = namedArgs.glue
    }
  }

  return list.join(_glue)
}
