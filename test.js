/**
 * @typedef {import('unist').Node} Node
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAllAfter} from 'unist-util-find-all-after'

const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')
const paragraph = tree.children[0]
assert(paragraph.type === 'paragraph')
const children = paragraph.children

test('findAllAfter', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-find-all-after')).sort(),
      ['findAllAfter']
    )
  })

  await t.test('should fail without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter()
    }, /Expected parent node/)
  })

  await t.test('should fail without parent node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter({type: 'foo'})
    }, /Expected parent node/)
  })

  await t.test('should fail without index', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter({type: 'foo', children: []})
    }, /Expected child node or index/)
  })

  await t.test('should fail with invalid index (#1)', async function () {
    assert.throws(function () {
      findAllAfter({type: 'foo', children: []}, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#2)', async function () {
    assert.throws(function () {
      findAllAfter({type: 'foo', children: []}, Number.POSITIVE_INFINITY)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#3)', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter({type: 'foo', children: []}, false)
    }, /Expected child node or index/)
  })

  await t.test('should fail with invalid index (#4)', async function () {
    assert.throws(function () {
      findAllAfter({type: 'foo', children: []}, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#5)', async function () {
    assert.throws(function () {
      findAllAfter({type: 'foo', children: []}, {type: 'bar'})
    }, /Expected child node/)
  })

  await t.test('should fail for invalid `test` (#1)', async function () {
    assert.throws(function () {
      findAllAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error: check that an error is thrown at runtime.
        false
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail for invalid `test` (#2)', async function () {
    assert.throws(function () {
      findAllAfter(
        {type: 'foo', children: [{type: 'bar'}, {type: 'baz'}]},
        0,
        // @ts-expect-error: check that an error is thrown at runtime.
        true
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, children[1]), children.slice(2))
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 1), children.slice(2))
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 7), [])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#1)',
    async function () {
      const text = children[6]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, 0, text), [text])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#2)',
    async function () {
      const emphasis = children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(findAllAfter(paragraph, children[0], emphasis), [
        emphasis
      ])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#3)',
    async function () {
      const emphasis = children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(findAllAfter(paragraph, 0, emphasis), [emphasis])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#4)',
    async function () {
      const text = children[0]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, text, text), [])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#5)',
    async function () {
      const text = children[0]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, 0, text), [])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#6)',
    async function () {
      const emphasis = children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(findAllAfter(paragraph, 1, emphasis), [])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 0, 'strong'), [children[3]])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#2)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 3, 'strong'), [])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#3)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, children[0], 'strong'), [
        children[3]
      ])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#4)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, children[3], 'strong'), [])
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 0, check), children.slice(5))
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#2)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 6, check), [])
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#3)',
    async function () {
      assert.deepEqual(
        findAllAfter(paragraph, children[4], check),
        children.slice(5)
      )
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#4)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, children[6], check), [])
    }
  )
})

/**
 * @param {Node} _
 * @param {number | null | undefined} n
 */
function check(_, n) {
  return typeof n === 'number' && n >= 5
}
