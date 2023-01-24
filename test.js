/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('mdast').Paragraph} Paragraph
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAllAfter} from './index.js'
import * as mod from './index.js'

const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')
const paragraph = /** @type {Paragraph} */ (tree.children[0])
const children = paragraph.children

test('findAllAfter', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['findAllAfter'],
    'should expose the public api'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllAfter()
    },
    /Expected parent node/,
    'should fail without parent'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllAfter({type: 'foo'})
    },
    /Expected parent node/,
    'should fail without parent node'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllAfter({type: 'foo', children: []})
    },
    /Expected child node or index/,
    'should fail without index'
  )

  assert.throws(
    () => {
      findAllAfter({type: 'foo', children: []}, -1)
    },
    /Expected positive finite number as index/,
    'should fail with invalid index (#1)'
  )

  assert.throws(
    () => {
      findAllAfter({type: 'foo', children: []}, Number.POSITIVE_INFINITY)
    },
    /Expected positive finite number as index/,
    'should fail with invalid index (#2)'
  )

  assert.throws(
    () => {
      // @ts-expect-error runtime.
      findAllAfter({type: 'foo', children: []}, false)
    },
    /Expected child node or index/,
    'should fail with invalid index (#3)'
  )

  assert.throws(
    () => {
      findAllAfter({type: 'foo', children: []}, -1)
    },
    /Expected positive finite number as index/,
    'should fail with invalid index (#4)'
  )

  assert.throws(
    () => {
      findAllAfter({type: 'foo', children: []}, {type: 'bar'})
    },
    /Expected child node/,
    'should fail with invalid index (#5)'
  )

  assert.throws(
    () => {
      findAllAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error runtime.
        false
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#1)'
  )

  assert.throws(
    () => {
      findAllAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error runtime.
        true
      )
    },
    /Expected function, string, or object as test/,
    'should fail for invalid `test` (#2)'
  )

  assert.deepEqual(
    findAllAfter(paragraph, children[1]),
    children.slice(2),
    'should return the following node when without `test` (#1)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, 1),
    children.slice(2),
    'should return the following node when without `test` (#1)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, 7),
    [],
    'should return the following node when without `test` (#1)'
  )

  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, 0, children[6]),
    [children[6]],
    'should return `node` when given a `node` and existing (#1)'
  )
  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, children[0], children[1]),
    [children[1]],
    'should return `node` when given a `node` and existing (#2)'
  )
  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, 0, children[1]),
    [children[1]],
    'should return `node` when given a `node` and existing (#3)'
  )
  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, children[0], children[0]),
    [],
    'should return `node` when given a `node` and existing (#4)'
  )
  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, 0, children[0]),
    [],
    'should return `node` when given a `node` and existing (#5)'
  )
  assert.deepEqual(
    // @ts-expect-error TS doesn’t understand nodes.
    findAllAfter(paragraph, 1, children[1]),
    [],
    'should return `node` when given a `node` and existing (#6)'
  )

  assert.deepEqual(
    findAllAfter(paragraph, 0, 'strong'),
    [children[3]],
    'should return a child when given a `type` and existing (#1)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, 3, 'strong'),
    [],
    'should return a child when given a `type` and existing (#2)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, children[0], 'strong'),
    [children[3]],
    'should return a child when given a `type` and existing (#3)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, children[3], 'strong'),
    [],
    'should return a child when given a `type` and existing (#4)'
  )

  assert.deepEqual(
    findAllAfter(paragraph, 0, check),
    children.slice(5),
    'should return a child when given a `test` and existing (#1)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, 6, check),
    [],
    'should return a child when given a `test` and existing (#2)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, children[4], check),
    children.slice(5),
    'should return a child when given a `test` and existing (#3)'
  )
  assert.deepEqual(
    findAllAfter(paragraph, children[6], check),
    [],
    'should return a child when given a `test` and existing (#4)'
  )

  /**
   * @param {Node} _
   * @param {number | null | undefined} n
   */
  function check(_, n) {
    return typeof n === 'number' && n >= 5
  }
})
