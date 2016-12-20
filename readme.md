# unist-util-find-all-after [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**Unist**][unist] utility to find nodes after another node.

## Installation

[npm][]:

```bash
npm install unist-util-find-all-after
```

## Usage

```js
var remark = require('remark');
var findAllAfter = require('unist-util-find-all-after');

var tree = remark().parse('Some _emphasis_, **importance**, and `code`.');
var paragraph = tree.children[0];

console.log(findAllAfter(paragraph, 1, 'text'));
```

Yields:

```js
[ { type: 'text', value: ', ' },
  { type: 'text', value: ', and ' },
  { type: 'text', value: '.' } ]
```

## API

### `findAllAfter(parent, node|index[, test])`

Find all children after `index` (or `node`) in `parent`, that passes `test`
(when given).

###### Parameters

*   `parent` ([`Node`][node]) — Context node;
*   `node` ([`Node`][node]) — Node in `parent`;
*   `index` (`number`, optional) — Position of a `node` in `parent`;
*   `test` (`Function`, `string`, or `Node`, optional)
    — See [`unist-util-is`][is].

###### Returns

[`Array.<Node>`][node] — Child nodes of `parent` passing `test`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/unist-util-find-all-after.svg

[travis]: https://travis-ci.org/syntax-tree/unist-util-find-all-after

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-find-all-after.svg

[codecov]: https://codecov.io/github/syntax-tree/unist-util-find-all-after

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[is]: https://github.com/syntax-tree/unist-util-is
