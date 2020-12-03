import {Node, Parent} from 'unist'
import findAllAfter = require('unist-util-find-all-after')

const heading: Node = {
  type: 'heading',
  depth: 2,
  children: []
}

const parent: Parent = {
  type: 'root',
  children: [heading]
}

/* === missing params === */
// $ExpectError
findAllAfter()
// $ExpectError
findAllAfter(parent)

/* === find by index/node === */
findAllAfter(parent, 1)
findAllAfter(parent, heading)
// $ExpectError
findAllAfter(parent, false)

/* === find with test === */
// $ExpectError
findAllAfter(parent, 1, false)
findAllAfter(parent, 1, 'paragraph')

/* === invalid return === */
// $ExpectError
const returnIsString: string = findAllAfter(parent, 1)

/* === valid return === */
const nodes: Node[] = findAllAfter(parent, 1)
