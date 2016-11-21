'use strict';

/* eslint-env mocha */

var assert = require('assert');
var mdast = require('mdast');
var findAllAfter = require('./');

var tree = mdast().parse('Some *emphasis*, **strongness**, and `code`.');
var paragraph = tree.children[0];
var children = paragraph.children;

describe('unist-util-find-all-after', function () {
  it('should fail without parent', function () {
    assert.throws(
      function () {
        findAllAfter();
      },
      /Expected parent node/
    );
  });

  it('should fail without parent node', function () {
    assert.throws(
      function () {
        findAllAfter({type: 'foo'});
      },
      /Expected parent node/
    );
  });

  it('should fail without index', function () {
    assert.throws(
      function () {
        findAllAfter({type: 'foo', children: []});
      },
      /Expected positive finite index or child node/
    );

    assert.throws(
      function () {
        findAllAfter({type: 'foo', children: []}, -1);
      },
      /Expected positive finite index or child node/
    );

    assert.throws(
      function () {
        findAllAfter({type: 'foo', children: []}, {type: 'bar'});
      },
      /Expected positive finite index or child node/
    );
  });

  it('should fail for invalid `test`', function () {
    assert.throws(
      function () {
        findAllAfter({
          type: 'foo',
          children: [{type: 'bar'}, {type: 'baz'}]
        }, 0, false);
      },
      /Expected function, string, or node as test/
    );

    assert.throws(
      function () {
        findAllAfter({
          type: 'foo',
          children: [{type: 'bar'}, {type: 'baz'}]
        }, 0, true);
      },
      /Expected function, string, or node as test/
    );
  });

  it('should return the following node when without `test`', function () {
    var res = children.slice(2);

    assert.deepEqual(findAllAfter(paragraph, children[1]), res);
    assert.deepEqual(findAllAfter(paragraph, 1), res);
    assert.deepEqual(findAllAfter(paragraph, 7), []);
  });

  it('should return `node` when given a `node` and existing', function () {
    assert.deepEqual(findAllAfter(paragraph, 0, children[6]), [children[6]]);
    assert.deepEqual(findAllAfter(paragraph, children[0], children[1]), [children[1]]);
    assert.deepEqual(findAllAfter(paragraph, 0, children[1]), [children[1]]);
    assert.deepEqual(findAllAfter(paragraph, children[0], children[0]), []);
    assert.deepEqual(findAllAfter(paragraph, 0, children[0]), []);
    assert.deepEqual(findAllAfter(paragraph, 1, children[1]), []);
  });

  it('should return a child when given a `type` and existing', function () {
    assert.deepEqual(findAllAfter(paragraph, 0, 'strong'), [children[3]]);
    assert.deepEqual(findAllAfter(paragraph, 3, 'strong'), []);
    assert.deepEqual(findAllAfter(paragraph, children[0], 'strong'), [children[3]]);
    assert.deepEqual(findAllAfter(paragraph, children[3], 'strong'), []);
  });

  it('should return a child when given a `test` and existing', function () {
    var res = children.slice(5);

    assert.deepEqual(findAllAfter(paragraph, 0, test), res);
    assert.deepEqual(findAllAfter(paragraph, 6, test), []);
    assert.deepEqual(findAllAfter(paragraph, children[4], test), res);
    assert.deepEqual(findAllAfter(paragraph, children[6], test), []);

    function test(node, n) {
      return n >= 5;
    }
  });
});
