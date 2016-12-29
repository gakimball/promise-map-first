# promise-map-first

> Get the value of the first promise in a series to resolve

[![Travis](https://img.shields.io/travis/spacedoc/promise-map-first.svg?maxAge=2592000)](https://travis-ci.org/spacedoc/promise-map-first) [![npm](https://img.shields.io/npm/v/promise-map-first.svg?maxAge=2592000)](https://www.npmjs.com/package/promise-map-first)

Runs a series of promises sequentially while iterating through a value, ignoring rejections, and returns the value of the first promise in the series to resolve.

Use this like an asynchronous `for` loop, where the condition is a Promise's resolve/reject mechanism.

## Installation

```bash
npm install promise-map-first
```

## Usage

```js
const first = require('promise-map-first');
const pify = require('pify');
const readFile = pify(require('fs').readFile);

const files = [
  'one.jpg',
  'two.txt', // <-- this file exists
  'three.mov', // <-- this file also exists
];

first(files, file => readFile(file)).then(res => {
  // res.index is 1
  // res.value is the contents of two.txt
});
```

## API

### first(input, fn)

Iterate over `input` by calling `fn` for each item in the series. The function should return a promise. Each promise is called sequentially. If a promise rejects, the next one is called. If a promise resolves, the value is returned, and no further functions are called.

- **input** (Iterable): items to iterate through.
- **fn** (Function): iterating function. Should return a promise. Takes these parameters:
  - **value**: value of current item.
  - **index** (Integer): index of current item.
  - **array** (Iterable): collection being iterated through.

Returns a Promise which resolves as soon as a promise in the series resolves. The promise contains an object with these properties:

- **index** (Integer): index of the item being referenced when the first promise resolved.
- **value**: value contained in the first resolved promise.

## Local Development

```bash
git clone https://github.com/spacedoc/promise-map-first
cd promise-map-first
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
