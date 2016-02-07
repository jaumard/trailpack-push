/**
 * Push notifications Configuration
 * (trails.config.push)
 *
 * Configure APN and GCM o send Android and iOS push notifications
 *
 * @see https://github.com/jaumard/trailpack-push
 */
module.exports = {
  gcm: {
    senderId: null
  },
  apn: {
    cert: null,
    key: null
    /*
     ca         : [],
     pfx        : "",
     passphrase : "",
     production : NODE_ENV == "production",
     voip : false,
     port : 2195,
     rejectUnauthorized : true,
     cacheLength : 1000,
     autoAdjustCache : true,
     maxConnections : 1,
     connectTimeout : 10000,
     connectionTimeout : 3600000,
     connectionRetryLimit : 10,
     buffersNotifications : true,
     fastMode : false
     //more infos here : https://github.com/argon/node-apn/blob/master/doc/connection.markdown
     */
  }
}
