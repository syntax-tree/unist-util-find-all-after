import {Node, Parent} from 'unist'
import {Test} from 'unist-util-is/index'

export = findAllAfter
/**
 * Unist utility to get all children of a parent after a node or index
 *
 * @param parent Parent to search in
 * @param Index or Node to start from
 * @param test that Nodes must pass to be included
 * @returns Array of found Nodes
 */
declare function findAllAfter<T extends Node>(
  parent: Parent,
  index: number | Node,
  test: Test<T> | Array<Test<T>>
): Node[]
