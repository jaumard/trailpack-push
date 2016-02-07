'use strict'
const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'push-trailpack-test',
    version: '1.0.0'
  },
  config: {
    push: {},
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('../') // trailpack
      ]
    }
  }
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
