'use strict'

const test = require('tape')
const tvmaze = require('../')
const Client = require('../lib/client')

test('should create a client', function (t) {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')

  let client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of Client')

  t.end()
})
