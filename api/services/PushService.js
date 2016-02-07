'use strict'

const Service = require('trails-service')
const gcm = require('node-gcm')
const apn = require('apn')
const _ = require('lodash')

/**
 * @module PushService
 * @description Send push notification to Android or iOS devices
 */
module.exports = class PushService extends Service {
  sendToAPN(token, message) {
    const options = this.app.config.push.apn;

    if (!Array.isArray(token)) {
      token = [token];
    }

    const apnConnection = new apn.Connection(options);

    let note = new apn.Notification();
    note = _.merge(note, message);

    for (let i = 0; i < token.length; i++) {
      const obj = token[i];
      const myDevice = new apn.Device(obj);
      apnConnection.pushNotification(note, myDevice);
    }
  }

  sendToGCM(ids, messageInfos, retry, next) {
    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    ids = _.chunk(ids, 1000)

    let message
    if (messageInfos) {
      message = new gcm.Message(messageInfos)
    }
    else {
      message = new gcm.Message()
    }

    // Set up the sender with you API key
    const sender = new gcm.Sender(this.app.config.push.gcm.senderId)

    for (let i = 0; i < ids.length; i++) {
      const obj = ids[i]

      if (retry) {
        sender.send(message, obj, next)
      }
      else {
        sender.sendNoRetry(message, obj, next)
      }
    }
  }
}

