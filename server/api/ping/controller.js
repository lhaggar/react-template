'use strict';

function ping(req, res) {
  res.json({
    status: 'ok',
    time: (new Date()).toISOString(),
  });
}

module.exports = {
  ping,
};
