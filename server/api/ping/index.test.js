'use strict';

const express = require('express');
const route = require('./');
const controller = require('./controller');

describe('Ping Route', () => {

  const stubs = [];
  afterEach(() => {
    stubs.forEach(s => s.restore());
    stubs.length = 0;
  });

  it('should return a create function', () => {
    expect(route.create).to.be.a('function');
  });

  it('create function should create and return router', () => {
    const dummyRouter = { get: sinon.stub() };
    stubs.push(sinon.stub(express, 'Router', () => dummyRouter));
    const pingSpy = sinon.spy(controller, 'ping');
    stubs.push(pingSpy);

    const res = route.create();
    expect(dummyRouter.get).to.have.been.calledWith('/', pingSpy);
    expect(res).to.equal(dummyRouter);
  });



});
