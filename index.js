'use strict'

var convert = require('unist-util-is/convert')

module.exports = findAllAfter

function findAllAfter(parent, index, test) {
  var is = convert(test)
  var results = []
  var children
  var child
  var length

  if (!parent || !parent.type || !parent.children) {
    throw new Error('Expected parent node')
  }

  children = parent.children
  length = children.length

  if (index === undefined) {
    throw new Error('Expected positive finite index or child node')
  } else if (index && typeof index !== 'number') {
    index = children.indexOf(index)
    if (index < 0) {
      throw new Error('Expected child node')
    }
  } else if (index < 0 || index === Infinity) {
    throw new Error('Expected positive finite index')
  }

  while (++index < length) {
    child = children[index]

    if (is(child, index, parent)) {
      results.push(child)
    }
  }

  return results
}
