'use strict'

// handlebars helpers have variable argument lists and eslint & jsdoc don't play nice with these
/* eslint no-unused-vars: ["error", { "args": "none" }] */

/**
 * Performs a modulo to determine which positional argument to return.
 *
 * Useful for selecting between cases inside of an `{{#each}}` loop.
 *
 * eg: given `someArray === ['A', 'B', 'C', 'D']` and the following template
 * ```hbs
 * <ol>
 *  {{#each someArray}}
 *    <li class="{{modChoose @index "even" "odd"}}">{{this}}</li>
 *  {{/each}}
 * </ol>
 * ```
 *
 * Expected output would be:
 * ```
 * <ol>
 *    <li class="even">A</li>
 *    <li class="odd">B</li>
 *    <li class="even">C</li>
 *    <li class="odd">D</li>
 * </ol>
 * ```
 *
 * @param {Number} dividend - value to modulo with divisor to determine positional argument to return
 * @param {...String|Number} values - values to select from
 *
 * @throws {TypeError} Will throw if incorrect number of positional args supplied
 * @returns {String}
 */
module.exports = function modChoose (dividend, values /* , options */) {
  var args = Array.prototype.slice.apply(arguments)
  var argc = args.length - 1 // last argument is always 'options'

  if (argc < 2) {
    throw new TypeError(
      'modChoose requires at least 2 arguments "key", and at least one value'
    )
  }

  var _dividend = parseInt(dividend, 10)
  var divisor = argc - 1
  var idx = (_dividend % divisor) + 1

  return args[idx]
}
