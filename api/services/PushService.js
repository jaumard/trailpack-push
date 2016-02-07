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
    var options = this.app.config.push.apn;

    if (!Array.isArray(token))
    {
      token = [token];
    }

    var apnConnection = new apn.Connection(options);

    var note = new apn.Notification();
    note     = _.merge(note, message);

    for (var i = 0; i < token.length; i++)
    {
      var obj      = token[i];
      var myDevice = new apn.Device(obj);
      apnConnection.pushNotification(note, myDevice);
    }
  }

  sendToGCM(ids, messageInfos, retry, next) {
    if(!Array.isArray(ids)) {
      ids = [ids]
    }

    ids = _.chunk(ids, 1000)

    let message
    if(messageInfos) {
      message = new gcm.Message(messageInfos)
    }
    else {
      message = new gcm.Message()
    }

    // Set up the sender with you API key
    var sender = new gcm.Sender(this.app.config.push.gcm.senderId)

    for(var i = 0; i < ids.length; i++) {
      var obj = ids[i]

      if(retry) {
        sender.send(message, obj, next)
      }
      else {
        sender.sendNoRetry(message, obj, next)
      }
    }
  }
}

