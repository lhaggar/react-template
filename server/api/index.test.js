'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const rewire = require('rewire');

const express = require('express');
const router = rewire('./');

describe('When setting up routes', () => {
  const rewireReverts = [];
  const stubs = [];
  let requireStub, dummyRouter, routerCreateResult;

  before(() => {
    stubs.push(sinon.stub(fs, 'readdirSync', () => {
      return [
        'folder-one',
        '-folder--two',
        'file-one.js',
        'index.js',
        'index.test.js',
        '--ignored-folder',
      ];
    }));
    requireStub = sinon.spy(filename => {
      const res = {dummyRouterFor: filename};
      if(filename === './folder-one') {
        return {create: () => res};
      }
      return res;
    });
    rewireReverts.push(router.__set__('require', requireStub));

    dummyRouter = { use: sinon.stub() };
    stubs.push(sinon.stub(express, 'Router', () => dummyRouter));

    routerCreateResult = router.create();
  });

  after(() => {
    rewireReverts.forEach(R.call);
    stubs.forEach(s => s.restore());
  });

  it('should read the directory', () => {
    expect(fs.readdirSync).to.have.been.calledWithExactly(sinon.match.string);
    expect(fs.readdirSync.args[0][0]).to.match(new RegExp('server\\'+path.sep+'api$'));
  });

  it('should only require the appropriate file', () => {
    expect(requireStub).to.have.been.calledThrice;
    expect(requireStub).to.have.been.calledWithExactly('./folder-one');
    expect(requireStub).to.have.been.calledWithExactly('./-folder--two');
    expect(requireStub).to.have.been.calledWithExactly('./file-one');
  });

  it('should set up a route for each required file', () => {
    expect(dummyRouter.use).to.have.been.calledThrice;
    expect(dummyRouter.use).to.have.been.calledWithExactly('/folder-one', {dummyRouterFor: './folder-one'});
    expect(dummyRouter.use).to.have.been.calledWithExactly('/-folder--two', {dummyRouterFor: './-folder--two'});
    expect(dummyRouter.use).to.have.been.calledWithExactly('/file-one', {dummyRouterFor: './file-one'});
  });

  it('should return the router', () => {
    expect(routerCreateResult).to.equal(dummyRouter);
  });

});
