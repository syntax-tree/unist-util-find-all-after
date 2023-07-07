/**
 * @typedef {import('mdast').Emphasis} Emphasis
 * @typedef {import('mdast').InlineCode} InlineCode
 * @typedef {import('unist').Node} UnistNode
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {findAllAfter} from 'unist-util-find-all-after'

test('findAllAfter', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('unist-util-find-all-after')).sort(),
      ['findAllAfter']
    )
  })

  const tree = fromMarkdown('Some *emphasis*, **importance**, and `code`.')

  assert(tree.type === 'root')
  const paragraph = tree.children[0]
  assert(paragraph.type === 'paragraph')
  const head = paragraph.children[0]
  assert(head.type === 'text')
  const next = paragraph.children[1]
  assert(next.type === 'emphasis')

  /** @type {Emphasis} */
  const emphasis = {type: 'emphasis', children: []}
  /** @type {InlineCode} */
  const inlineCode = {type: 'inlineCode', value: 'a'}

  await t.test('should fail without parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter()
    }, /Expected parent node/)
  })

  await t.test('should fail without parent node', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter(inlineCode)
    }, /Expected parent node/)
  })

  await t.test('should fail without index', async function () {
    assert.throws(function () {
      // @ts-expect-error: check that an error is thrown at runtime.
      findAllAfter(emphasis)
    }, /Expected child node or index/)
  })

  await t.test('should fail with invalid index (#1)', async function () {
    assert.throws(function () {
      findAllAfter(emphasis, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#2)', async function () {
    assert.throws(function () {
      findAllAfter(emphasis, Number.POSITIVE_INFINITY)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#3)', async function () {
    assert.throws(function () {
      findAllAfter(
        emphasis,
        // @ts-expect-error: check that an error is thrown at runtime.
        false
      )
    }, /Expected child node or index/)
  })

  await t.test('should fail with invalid index (#4)', async function () {
    assert.throws(function () {
      findAllAfter(emphasis, -1)
    }, /Expected positive finite number as index/)
  })

  await t.test('should fail with invalid index (#5)', async function () {
    assert.throws(function () {
      findAllAfter(emphasis, inlineCode)
    }, /Expected child node/)
  })

  await t.test('should fail for invalid `test` (#1)', async function () {
    assert.throws(function () {
      findAllAfter(
        emphasis,
        0,
        // @ts-expect-error: check that an error is thrown at runtime.
        false
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test('should fail for invalid `test` (#2)', async function () {
    assert.throws(function () {
      findAllAfter(
        emphasis,
        0,
        // @ts-expect-error: check that an error is thrown at runtime.
        true
      )
    }, /Expected function, string, or object as test/)
  })

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.deepEqual(
        findAllAfter(paragraph, paragraph.children[1]),
        paragraph.children.slice(2)
      )
    }
  )

  await t.test(
    'should return the following node when without `test` (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 1), paragraph.children.slice(2))
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
      const text = paragraph.children[6]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, 0, text), [text])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#2)',
    async function () {
      const emphasis = paragraph.children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(
        findAllAfter(paragraph, paragraph.children[0], emphasis),
        [emphasis]
      )
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#3)',
    async function () {
      const emphasis = paragraph.children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(findAllAfter(paragraph, 0, emphasis), [emphasis])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#4)',
    async function () {
      const text = paragraph.children[0]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, text, text), [])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#5)',
    async function () {
      const text = paragraph.children[0]
      assert(text.type === 'text')
      assert.deepEqual(findAllAfter(paragraph, 0, text), [])
    }
  )

  await t.test(
    'should return `node` when given a `node` and existing (#6)',
    async function () {
      const emphasis = paragraph.children[1]
      assert(emphasis.type === 'emphasis')
      assert.deepEqual(findAllAfter(paragraph, 1, emphasis), [])
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#1)',
    async function () {
      assert.deepEqual(findAllAfter(paragraph, 0, 'strong'), [
        paragraph.children[3]
      ])
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
      assert.deepEqual(
        findAllAfter(paragraph, paragraph.children[0], 'strong'),
        [paragraph.children[3]]
      )
    }
  )

  await t.test(
    'should return a child when given a `type` and existing (#4)',
    async function () {
      assert.deepEqual(
        findAllAfter(paragraph, paragraph.children[3], 'strong'),
        []
      )
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#1)',
    async function () {
      assert.deepEqual(
        findAllAfter(paragraph, 0, check),
        paragraph.children.slice(5)
      )
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
        findAllAfter(paragraph, paragraph.children[4], check),
        paragraph.children.slice(5)
      )
    }
  )

  await t.test(
    'should return a child when given a `test` and existing (#4)',
    async function () {
      assert.deepEqual(
        findAllAfter(paragraph, paragraph.children[6], check),
        []
      )
    }
  )
})

/**
 * @param {UnistNode} _
 * @param {number | null | undefined} n
 */
function check(_, n) {
  return typeof n === 'number' && n >= 5
}
