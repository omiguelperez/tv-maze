# tv-maze

Wrapper para consumir la API de TVMaze

## Usage

```js
var tvmaze = require('tv-maze')

var client = tvmaze.createClient()

client.shows(function (err, shows) {
  // do something with shows
})

client.search('under', function (err, shows) {
  // do something with shows
})
```
