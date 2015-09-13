/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-all-after
 * @fileoverview Test suite for `unit-util-find-all-after`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var mdast = require('mdast');
var findAllAfter = require('./');

/*
 * Methods.
 */

var dequal = assert.deepEqual;

/*
 * Fixture.
 */

var ast = mdast.parse('Some *emphasis*, **strongness**, and `code`.');
var paragraph = ast.children[0];
var children = paragraph.children;

/*
 * Tests.
 */

describe('unist-util-find-all-after', function () {
    it('should fail without parent', function () {
        assert.throws(function () {
            findAllAfter();
        }, /Expected parent node/);
    });

    it('should fail without parent node', function () {
        assert.throws(function () {
            findAllAfter({
                'type': 'foo'
            });
        }, /Expected parent node/);
    });

    it('should fail without index', function () {
        assert.throws(function () {
            findAllAfter({
                'type': 'foo',
                'children': []
            });
        }, /Expected positive finite index or child node/);

        assert.throws(function () {
            findAllAfter({
                'type': 'foo',
                'children': []
            }, -1);
        }, /Expected positive finite index or child node/);

        assert.throws(function () {
            findAllAfter({
                'type': 'foo',
                'children': []
            }, {
                'type': 'bar'
            });
        }, /Expected positive finite index or child node/);
    });

    it('should fail for invalid `test`', function () {
        assert.throws(function () {
            findAllAfter({
                'type': 'foo',
                'children': [{
                    'type': 'bar'
                }, {
                    'type': 'baz'
                }]
            }, 0, false);
        }, /Expected function, string, or node as test/);

        assert.throws(function () {
            findAllAfter({
                'type': 'foo',
                'children': [{
                    'type': 'bar'
                }, {
                    'type': 'baz'
                }]
            }, 0, true);
        }, /Expected function, string, or node as test/);
    });

    it('should return the following node when without `test`', function () {
        var res = children.slice(2);

        dequal(findAllAfter(paragraph, children[1]), res);
        dequal(findAllAfter(paragraph, 1), res);
        dequal(findAllAfter(paragraph, 7), []);
    });

    it('should return `node` when given a `node` and existing', function () {
        dequal(findAllAfter(paragraph, 0, children[6]), [children[6]]);
        dequal(findAllAfter(paragraph, children[0], children[1]), [children[1]]);
        dequal(findAllAfter(paragraph, 0, children[1]), [children[1]]);
        dequal(findAllAfter(paragraph, children[0], children[0]), []);
        dequal(findAllAfter(paragraph, 0, children[0]), []);
        dequal(findAllAfter(paragraph, 1, children[1]), []);
    });

    it('should return a child when given a `type` and existing', function () {
        dequal(findAllAfter(paragraph, 0, 'strong'), [children[3]]);
        dequal(findAllAfter(paragraph, 3, 'strong'), []);
        dequal(findAllAfter(paragraph, children[0], 'strong'), [children[3]]);
        dequal(findAllAfter(paragraph, children[3], 'strong'), []);
    });

    it('should return a child when given a `test` and existing', function () {
        var res = children.slice(5);

        /** Test */
        function test(node, n) {
            return n >= 5;
        }

        dequal(findAllAfter(paragraph, 0, test), res);
        dequal(findAllAfter(paragraph, 6, test), []);
        dequal(findAllAfter(paragraph, children[4], test), res);
        dequal(findAllAfter(paragraph, children[6], test), []);
    });
});
