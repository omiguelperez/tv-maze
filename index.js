'use strict'

const Client = require('./lib/client')

function createClient () {
  return new Client()
}

module.exports = {
  createClient: createClient
}
