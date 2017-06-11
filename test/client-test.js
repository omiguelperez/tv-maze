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
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.equals(shows[0].name, 'Silicon Valley', 'should retrieve a show name')
    t.end()
  })
})

test('should search show by id', function (t) {
  let client = tvmaze.createClient({ endpoint: endpoint })
  let id = 1

  t.ok(client.findById, 'should exist')
  t.equals(typeof client.findById, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows/' + id)
    .reply(200, { name: 'Under the Dome' })

  client.findById(id, function (err, show) {
    t.error(err, 'should not be error')
    t.equals(typeof show, 'object', 'should be an object')
    t.equals(show.name, 'Under the Dome', 'should retrieve a show name')
    t.end()
  })
})

test('should fail with unknown endpoint', function (t) {
  let client = tvmaze.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', 'GET', null, function (err, shows) {
    t.ok(err, 'request failed')
    t.end()
  })
})

test('should fail if not query is passed', function (t) {
  let client = tvmaze.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/search/shows')
    .reply(400, {
      code: 0,
      message: 'Missing required parameter: q',
      name: 'Bad Request',
      status: 400
    })

  client._request('/search/shows', 'GET', null, function (err, shows) {
    t.ok(err, 'bad request error')
    t.notOk(shows, 'reply should be null')
    t.end()
  })
})
