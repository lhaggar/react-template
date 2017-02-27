'use strict';

const express = require('express');
const controller = require('./controller');

function create() {
  const router = express.Router();
  router.get('/', controller.ping);
  return router;
}

module.exports = {
  create,
};
