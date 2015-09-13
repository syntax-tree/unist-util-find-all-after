# unist-util-find-all-after [![Build Status](https://img.shields.io/travis/wooorm/unist-util-find-all-after.svg)](https://travis-ci.org/wooorm/unist-util-find-all-after) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/unist-util-find-all-after.svg)](https://codecov.io/github/wooorm/unist-util-find-all-after?branch=master)

[**Unist**](https://github.com/wooorm/unist) utility to find nodes after
another node. Useful when working with [**mdast**](https://github.com/wooorm/mdast)
or [**retext**](https://github.com/wooorm/retext).

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install unist-util-find-all-after
```

**unist-util-find-all-after** is also available for
[bower](http://bower.io/#install-packages) and [duo](http://duojs.org/#getting-started),
and as an AMD, CommonJS, and globals module, [uncompressed](unist-util-find-all-after.js)
and [compressed](unist-util-find-all-after.min.js).

## Usage

```js
var mdast = require('mdast');
var findAllAfter = require('unist-util-find-all-after');
var inspect = require('unist-util-inspect');

function log(nodes) {
    console.log(nodes && inspect(nodes));
    console.log();
}

mdast.use(function () {
    return function (ast) {
        var paragraph = ast.children[0];
        var children = paragraph.children;

        log(findAllAfter(paragraph, 3));
        log(findAllAfter(paragraph, children[3]));
        log(findAllAfter(paragraph, children[3], 'inlineCode'));
    };
}).process('Some _emphasis_, **strongness**, and `code`.');
```

Yields:

```text
text: ', and '
inlineCode: 'code'
text: '.'

text: ', and '
inlineCode: 'code'
text: '.'

inlineCode: 'code'
```

## API

### findAllAfter(parent, index|node\[, test\])

Find the nodes after `index` (or `node`), that pass `test` (when given).

**Parameters**:

*   `parent` (`Node`) — Parent to search in;

*   `node` (`Node`)
    — [Node](https://github.com/wooorm/unist#unist-nodes) to search after;

*   `index` (`number`) — Position of child to search after;

*   `test` (`Function`, `string`, or `Node`; optional)
    — See [`is()`](https://github.com/wooorm/unist-util-is#istest-node-index-parent-context).

**Returns**: `Array.<node>?`. Child nodes of `parent` which pass `test`.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
