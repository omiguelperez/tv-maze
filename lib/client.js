'use strict'

const request = require('client-request')
const qs = require('querystring')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

Client.prototype._request = function (path, method, params, callback) {
  let uri = this.endpoint + path

  if (params) {
    uri = uri + '?' + qs.encode(params)
  }

  request({
    uri: uri,
    method: method,
    json: true
  }, function (err, response, body) {
    if (err) return callback(err)

    if (response.statusCode !== 200) return callback(new Error('An error ocurred in the request'))

    callback(null, body)
  })
}

Client.prototype.shows = function (callback) {
  this._request('/shows', 'GET', null, callback)
}

Client.prototype.search = function (show, callback) {
  this._request('/search/shows', 'GET', { q: show }, callback)
}

module.exports = Client
