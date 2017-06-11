'use strict'

const test = require('tape')
const nock = require('nock')
const tvmaze = require('../')
const Client = require('../lib/client')

const endpoint = 'http://api.tvmaze.test'

test('should create a client', function (t) {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')

  let client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be instance of Client')

  t.end()
})

test('should list shows', function (t) {
  let client = tvmaze.createClient({ endpoint: endpoint })

  t.ok(client.shows, 'show exist')
  t.equals(typeof client.shows, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows')
    .reply(200, [])

  client.shows(function (err, shows) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.end()
  })
})

test('should search shows', function (t) {
  let client = tvmaze.createClient({ endpoint: endpoint })

  t.ok(client.search, 'should exist')
  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search/shows')
    .query({ q: 'silicon' })
    .reply(200, [{ name: 'Silicon Valley' }])

  client.search('silicon', function (err, shows) {
    t.error(err, 'should not be an erro')
    t.ok(Array.isArray(shows), 'should be an array')
    t.equals(shows[0].name, 'Silicon Valley', 'should retrieve a show name')
    t.end()
  })
})
