// © 2017 Allie Reilly

import { settingsStorage } from "settings";
import { me } from "companion";
import * as messaging from "messaging";

console.log("Companion Started");

/** @function
 *  @name = settingsStorage.onchange (event)
 *  Parses the message event from the companion components on change
 *  and sends it to the messaging function
 */
settingsStorage.onchange = function(evt) {
   
//  let data = JSON.parse(evt.newValue);
//  let value = data.name;
//  console.log("sending data: " + evt.key + ":" + value);
//  sendMessage(evt.key, value)

//sendValue(evt.key, data["values"][0].value);

  //console.log(JSON.stringify(evt));  
  var obj = JSON.parse(evt.newValue, function (event, value) {

    sendMessage(evt.key, value); 
    //console.log(evt.key + ": " + value);
  }); 
}

/** @function
 *  @name = sendMessage (key, value)
 *  Send key/value pair
 */
function sendMessage(key, val) {

    var data = {key: key, value: val};
  
    // ##TO_DO## Test
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN || messaging.peerSocket.readyState == 0) {
       messaging.peerSocket.send(data);
    } else {
       console.log("No peerSocket connection");
    }
}
