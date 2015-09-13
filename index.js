/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unist:util:find-all-after
 * @fileoverview Utility to find nodes after another node.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var is = require('unist-util-is');

/**
 * Find nodes after `index` in `parent` which pass `test`.
 *
 * @param {Node} parent - Parent to search in.
 * @param {number|Node} index - (Position of) node to
 *   search after.
 * @param {*} test - See `wooorm/unist-util-is`.
 * @return {Node?} - A child node of `parent` which pass
 *   `test`.
 */
function findAllAfter(parent, index, test) {
    var results = [];
    var children;
    var child;
    var length;

    if (!parent || !parent.type || !parent.children) {
        throw new Error('Expected parent node');
    }

    children = parent.children;
    length = children.length;

    if (index && index.type) {
        index = children.indexOf(index);
    }

    if (isNaN(index) || index < 0 || index === Infinity) {
        throw new Error('Expected positive finite index or child node');
    }

    while (++index < length) {
        child = children[index];

        if (is(test, child, index, parent)) {
            results.push(child);
        }
    }

    return results;
}

/*
 * Expose.
 */

module.exports = findAllAfter;
