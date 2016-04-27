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

  /**
   * Send a push notification to iOS devices for one or multiple tokens
   * @param token (s) to send to
   * @param message to send
   */
  sendToAPN(token, message) {
    const options = this.app.config.push.apn
    if (!Array.isArray(token)) {
      token = [token]
    }

    const apnConnection = new apn.Connection(options)

    if (message.aps.badge)
      message.aps.badge = parseInt(message.aps.badge) || 0

    let note = new apn.Notification()
    note = _.merge(note, message.aps)
    note.payload = message
    note.contentAvailable = note.payload.aps['content-available'] || 0
    delete note.payload.aps

    for (const part in token) {
      const myDevice = new apn.Device(token[part])
      apnConnection.pushNotification(note, myDevice)
    }
  }

  /**
   * Send push notifications to Android devices
   * @param ids tokens to send message to
   * @param senderId serverID to use to send notifications
   * @param messageInfos data to send
   * @param retry on failure
   * @param next callback results
   */
  sendToGCM(ids, senderId, messageInfos, retry, next) {
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
    const sender = new gcm.Sender(senderId)

    for (const part in ids) {
      if (retry) {
        sender.send(message, ids[part], {}, next)
      }
      else {
        sender.sendNoRetry(message, ids[part], next)
      }
    }
  }
}

