# trailpack-push
[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

:package: Trailpack to send push notification to Android and iOS devices from Trails application

Base on node-gcm and apn modules.

## Intallation
With yo : 

```
npm install -g yo generator-trails
yo trails:trailpack trailpack-push
```

With npm (you will have to create config file manually) :
 
`npm install --save trailpack-push`

## Configuration 
You need a `/config/push.js` file under your Trails project to configure your apis credential like this : 

    module.exports.push = {
    	gcm : {
    		senderId : null //Server API key
    	},
    	apn : {
    		cert : null, //Path to cert file
    		key  : null, //Path to key file
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
    };
    
## Usage : 
After install a new service is available. You can send GCM message/notification like this : 

    this.app.services.pushService.sendToGCM("DEVICE_TOKEN", {
        data         : {
          key1 : 'message1',
          key2 : 'message2'
        },
        notification: {
          title: "Hello, World",
          icon: "ic_launcher",
          body: "This is a notification that will be displayed ASAP."
        }
      }, true, function (err, results)
      {
        console.log(err, results);
      });
More informations about parameters here : https://github.com/ToothlessGear/node-gcm#usage
      
For an APN notification : 

    this.app.services.pushnotification.sendToAPN("DEVICE_TOKEN", {
        badge : 3,
        sound : "ping.aiff",
        alert : "new message",
        payload : {'messageFrom': 'Caroline'}
    });
More informations about parameters here : https://github.com/argon/node-apn#sending-a-notification
   

## License
[MIT](https://github.com/jaumard/trailpack-push/blob/master/LICENSE)


[npm-image]: https://img.shields.io/npm/v/trailpack-push.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-push
[npm-download]: https://img.shields.io/npm/dt/trailpack-push.svg
[ci-image]: https://travis-ci.org/jaumard/trailpack-push.svg?branch=master
[ci-url]: https://travis-ci.org/jaumard/trailpack-push
[daviddm-image]: http://img.shields.io/david/jaumard/trailpack-push.svg?style=flat-square
[daviddm-url]: https://david-dm.org/jaumard/trailpack-push
[codeclimate-image]: https://img.shields.io/codeclimate/github/jaumard/trailpack-push.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/jaumard/trailpack-push
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/jaumard/trailpack-push/badge.svg?style=beer-square)](https://beerpay.io/jaumard/trailpack-push)  [![Beerpay](https://beerpay.io/jaumard/trailpack-push/make-wish.svg?style=flat-square)](https://beerpay.io/jaumard/trailpack-push?focus=wish)