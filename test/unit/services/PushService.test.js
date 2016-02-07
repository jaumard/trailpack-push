'use strict'
/* global describe, it */

const assert = require('assert')

describe('PushService', () => {
  it('should exist', () => {
    assert(global.app.api.services['PushService'])
  })
})
