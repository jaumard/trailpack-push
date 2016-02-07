# trailpack-push
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
   
