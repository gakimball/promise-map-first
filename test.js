'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const first = require('.');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe('first()', () => {
  it('returns the index and value of the first resolved promise', () => {
    const series = [
      Promise.reject(),
      Promise.resolve('kittens')
    ];

    return expect(first(series, v => v)).to.eventually.eql({
      index: 1,
      value: 'kittens'
    });
  });

  it('rejects if no promises are resolved', () => {
    const series = [
      Promise.reject(),
      Promise.reject()
    ];

    return expect(first(series, v => v)).to.eventually.be.rejected;
  });

  it('calls the iterating function with an element, index, and iterable', () => {
    const series = ['zero'];
    const stub = sinon.stub();
    stub.returns(Promise.resolve());

    return first(series, stub).then(() => {
      expect(stub).to.have.been.calledWithExactly('zero', 0, series);
    });
  });
});
