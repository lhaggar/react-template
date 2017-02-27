'use strict';

const controller = require('./controller');

describe('Ping Route', () => {

  const stubs = [];
  afterEach(() => {
    stubs.forEach(s => s.restore());
    stubs.length = 0;
  });

  it('should return a ping handler function', () => {
    expect(controller.ping).to.be.a('function');
  });

  it('ping function should send ping json', () => {
    stubs.push(sinon.spy(Date.prototype, 'toISOString'));
    const dummyRes = { json: sinon.stub() };

    controller.ping({}, dummyRes);
    expect(dummyRes.json).to.have.been.calledWith({
      status: 'ok',
      time: Date.prototype.toISOString.returnValues[0],
    });
  });



});
