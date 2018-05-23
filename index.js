"use strict"

const express = require('express')
const bodyParser = require('body-parser');

const router = express.Router();

router
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

router.__dbHandler = {};

router.useDatabase = function(db) {
  for (let n in db) {
    router.__dbHandler[n] = db[n]
  }
  return this;
}

router.parseApi = function(api) {
  const patt = /^\w+/i;
  const method = `${api.match(patt)}`;          // convert to string
  const uri = `${api.replace(patt,"")}`;
  const includePath = `${api.replace(":","")}`;
  return { method, uri, includePath }
}

router.createFunction = function(method, uri, funcs, options) {
  const middleWares = funcs.map( (func) => {
    return func(router.__dbHandler, options)
  })
  router[method](uri, ...middleWares)
  return router;
}

module.exports = router;