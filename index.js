/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 *
 * @typedef {import('unist-util-is').Type} Type
 * @typedef {import('unist-util-is').Props} Props
 * @typedef {import('unist-util-is').TestFunctionAnything} TestFunctionAnything
 */

import {convert} from 'unist-util-is'

export const findAllAfter =
  /**
   * @type {(
   *  (<T extends Node>(node: Parent, index: Node|number, test: T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>|Array.<T['type']|Partial<T>|import('unist-util-is').TestFunctionPredicate<T>>) => Array.<T>) &
   *  ((node: Parent, index: Node|number, test?: null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>) => Array.<Node>)
   * )}
   */
  (
    /**
     * Utility to get all children of a parent after a node or index
     *
     * @param {Parent} parent Parent node
     * @param {Node|number} index Child of `parent`, or it’s index
     * @param {null|undefined|Type|Props|TestFunctionAnything|Array<Type|Props|TestFunctionAnything>} [test] is-compatible test (such as a type)
     * @returns {Array.<Node>}
     */
    function (parent, index, test) {
      const is = convert(test)
      /** @type {Array.<Node>} */
      const results = []

      if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node')
      }

      if (typeof index === 'number') {
        if (index < 0 || index === Number.POSITIVE_INFINITY) {
          throw new Error('Expected positive finite number as index')
        }
      } else {
        index = parent.children.indexOf(index)

        if (index < 0) {
          throw new Error('Expected child node or index')
        }
      }

      while (++index < parent.children.length) {
        if (is(parent.children[index], index, parent)) {
          results.push(parent.children[index])
        }
      }

      return results
    }
  )
