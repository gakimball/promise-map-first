'use strict';

/**
 * Call a Promise-returning function once for each item in an iterable. Return the index and value of the first resolved promise. Reject if no promise resolves.
 * I stared at https://github.com/sindresorhus/p-reduce/blob/master/index.js for a while to figure this out. Thanks @sindresorhus!
 * @param iterable - Thing to iterate through.
 * @param {IteratorFunction} fn - Iterator function.
 * @returns {Promise.<ResolvedValue>} Promise containing index and value of first resolved promise. Rejects if no promise in the series resolves.
 */
module.exports = function promiseMapFirst(iterable, fn) {
  return new Promise((resolve, reject) => {
    const iterator = iterable[Symbol.iterator]();
    let index = -1;

    next();

    /**
     * Call the iterator function using the next value in the iterable.
     */
    function next() {
      const elem = iterator.next();
      index++;

      // If we get this far, no promises ever resolved
      if (elem.done) {
        reject();
        return;
      }

      /**
       * Promise iterator function.
       * @callback IteratorFunction
       * @param value - Current value in iteration.
       * @param {Integer} index - Current index in iteration.
       * @param iterable - Complete series being iterated through.
       * @returns {Promise} Promise containing some value.
       */
      fn(elem.value, index, iterable)
        .then(v => {
          resolve({
            index: index,
            value: v
          });
        })
        .catch(next);
    }
  });
}
