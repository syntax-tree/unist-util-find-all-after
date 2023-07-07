/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist-util-is').Test} Test
 */

import {convert} from 'unist-util-is'

/**
 * Find nodes in `parent` after a `child` or after an index, that pass `test`.
 *
 * @template {Node} Kind
 *   Node type.
 *
 * @overload
 * @param {Parent} parent
 * @param {Node | number} index
 * @param {import('unist-util-is').Test} test
 * @returns {Array<Kind>}
 *
 * @overload
 * @param {Parent} parent
 * @param {Node | number} index
 * @param {Test} [test]
 * @returns {Array<Node>}
 *
 * @param {Parent} parent
 *   Parent node.
 * @param {Node | number} index
 *   Child of `parent` or it’s index.
 * @param {Test} [test]
 *   `unist-util-is`-compatible test.
 * @returns {Array<Node>}
 *   Children of `parent` that pass `test`.
 */
export function findAllAfter(parent, index, test) {
  const is = convert(test)
  /** @type {Array<Node>} */
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
