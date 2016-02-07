'use strict'

const Trailpack = require('trailpack')

module.exports = class PushTrailpack extends Trailpack {

  /**
   * Validate APN and GCM configurations
   */
  validate () {
    if (!this.app.config.push) {
      return Promise.reject(new Error('There no push.js under ./config, check it\'s load in ./config/index.js or create it !'))
    }

    if (!this.app.config.push.gcm || this.app.config.push.gcm.senderId === null) {
      this.app.log.warn('No GCM sender ID, GCM notifications will be ignored !')
    }
    if (!this.app.config.push.apn || this.app.config.push.apn.cert === null || this.app.config.push.apn.key === null) {
      this.app.log.warn('No APN cert or key, APN notifications will be ignored !')
    }

    return Promise.resolve()
  }


  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

