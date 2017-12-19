// © 2017 Allie Reilly

import { settingsStorage } from "settings";
import { me } from "companion";
import * as messaging from "messaging";

console.log("Companion Started");

const DEBUG_MODE = false;

/** @function
 *  @name = settingsStorage.onchange (event)
 *  Parses the message event from the companion components on change
 *  and sends it to the messaging function
 */
settingsStorage.onchange = function(evt) {
   
  if (DEBUG_MODE) {
    console.log(JSON.stringify(evt));
  }
  var obj = JSON.parse(evt.newValue, function (event, value) {

    sendMessage(evt.key, value);
    
    if (DEBUG_MODE) {
      console.log(evt.key + ": " + value);
    }
  }); 
}

/** @function
 *  @name = sendMessage (key, value)
 *  Send key/value pair
 */
function sendMessage(key, value) {

    var data = {key: key, value: value};
  
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN || messaging.peerSocket.readyState == 0) {
       messaging.peerSocket.send(data);
    } else {
       console.error("No peerSocket connection");
       setTimeout(sendMessage, 5000, key, value);
    }
}
