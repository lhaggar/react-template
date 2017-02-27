'use strict';

const fs = require('fs');
const R = require('ramda');
const express = require('express');

const EOL = require('os').EOL;
function create() {
  const router = express.Router();

  const routeRejector = R.either(
    R.either(R.equals('index.js'), R.equals('index.test.js')),
    R.test(/^--/)
  );

  const getRouteNames = R.compose(
    R.map(R.compose(R.head, R.split('.'))),
    R.reject(routeRejector),
    fs.readdirSync,
    R.always(__dirname)
  );

  const routes = getRouteNames();
  routes.forEach(filename => {
    console.log(`Router now attempting to initialise '${filename}'...`);
    try {
      const file = require(`./${filename}`);
      const fileRouter = file.create ? file.create() : file;
      router.use(`/${filename}`, fileRouter);
      console.log(`Router successfully initialised '${filename}'`);
    } catch(err) {
      console.log(`Router error: error occurred loading router: ${filename}, check module exports. Original error:${EOL}${err.stack}`);
    }
  });

  return router;
}

module.exports = {
  create,
};
