// © 2017 Allie Reilly
// Version 1.0.5

import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import { battery } from 'power';
import { me } from "appbit";
import { preferences } from "user-settings";
import document from "document";
import * as prefs from "../common/shared_preferences";
import * as messaging from "messaging";
import * as utils from "../common/utils";

console.log("Elegant Clock App Started");

const DEBUG_MODE = false;

// Update the clock every minute
clock.granularity = "seconds";

const GOLD_COLOR_1 = "#ebd197";
const GOLD_COLOR_2 = "#998100";

const SILVER_COLOR_1 = "#D3D3D3";
const SILVER_COLOR_2 = "#808080";

// Initialise Sensors
let heartRateMonitor = new HeartRateSensor();

// Get a handles on the interface elements
let timeLabel = document.getElementById("time-label");
let dateLabel = document.getElementById("date-label");
let heartRateLabel = document.getElementById("hr-label");
let batteryLabel = document.getElementById("battery-label");
let heartSymbol = document.getElementById("heart-label");

let bar = document.getElementById("bar");

// Initialise variables
let heartRate = 0;
let count = 0;
let heartSymbolCount = 0;
let clockDisplay = preferences.clockDisplay;

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

/** @function
 *  @name updateBattery 
 *  Update the battery circle indicator and percentage
 */
function updateBattery() {
  
  var batteryLevel = battery.chargeLevel;
  
  if (DEBUG_MODE) {
    console.log(`battery level: ${batteryLevel}%`);
  }
  
  batteryLabel.text = batteryLevel + "%";
}

function changeColorScheme(color) {
  
  if (DEBUG_MODE) {
    console.log("color scheme changed: " + color);
  }
  
  var gradient = bar.gradient;

  if (color == "gold") {
    gradient.colors['c1'] = GOLD_COLOR_1;
    gradient.colors['c2'] = GOLD_COLOR_2;
    timeLabel.style.fill = GOLD_COLOR_2;
    heartRateLabel.style.fill = GOLD_COLOR_2;
  }
  else if (color == "silver") {
    gradient.colors['c1'] = SILVER_COLOR_1;
    gradient.colors['c2'] = SILVER_COLOR_2;
    timeLabel.style.fill = SILVER_COLOR_2;
    heartRateLabel.style.fill = SILVER_COLOR_2;
  }
}

function checkHeartRateSensorWorking() {
  
  // time now
  var now = Date.now();
  // difference between now and the last time a heart reading was taken.
  var difference = (now - lastValueTimestamp) / 1000;
  
  /**
  if (DEBUG_MODE) {
    console.log("hr: " + heartRate);
    console.log("ts: " + lastValueTimestamp + " now: " + now);
    console.log("ts diff: " + difference);
  }
  **/
  
  if (difference > 3) {
      
    heartRateLabel.text = "---";
  }
}

/** @function
 *  @name = clock.ontick (event)
 *  Update the time and date elements with the current time and date
 */
clock.ontick = function(event) {
  
  var hours = event.date.getHours();

  if (clockDisplay == "12h" && hours > 12) hours-=12;
  if (clockDisplay == "12h" && hours == 0) hours = 12;
  
  hours = utils.zeroPad(hours, 1);
  
  var minutes = utils.zeroPad(event.date.getMinutes(), 1);
    
  timeLabel.text = `${hours}:${minutes}`;
  dateLabel.text = `${utils.getDay()} ${utils.getMonth()}`;;
}

/** @function
 *  @name heartRateMonitor.onreading 
 *  On each reading received update heart rate and collect heart rate data
 *  #TO_DO work on getting correct time stamp
 *  #TO_DO log heart rate data to json string and add to companion app for download
 */
heartRateMonitor.onreading = function() {

  // Update timestamp;
  lastValueTimestamp = Date.now();
  
  // Retrieve heart rate from sensor
  heartRate = heartRateMonitor.heartRate;
  
  // Add heart rate to document element
  heartRateLabel.text = heartRate;
  heartSymbol.text = "\u2665";
  
  switch(heartSymbolCount) {
    case 0:
        heartSymbol.style.fontSize = 30;
        heartSymbolCount = 1;
        break;
    case 1:
        heartSymbol.style.fontSize = 50;
        heartSymbolCount = 0;
        break;
    default:
        heartSymbol.style.fontSize = 20;
        heartSymbolCount = 0;
  }
}

heartRateMonitor.onerror = function(error) {
  
  console.error(error);
}

/** @function
 *  @name me.onunload 
 *  When user closes app stop heart rate sensor
 */
me.onunload = function () {

  console.log("Saving App preferences");
  prefs.save();
  heartRateMonitor.stop();
  console.log("App Stopped");
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  
  var key = evt.data.key;
  var value = evt.data.value;
  // console.log("device got: " + evt.data.background);
  //console.log("  key: " + key + " value: " + value);
  
  if (key == "color") {

    var color = evt.data.value;
    //console.log("Color: " + color);

    if (color == "silver" || color == "gold") {
      
      changeColorScheme(color);
      prefs.setItem("color", color);
      prefs.save();
    }
  }
  else {
    console.error("key is not recognised: " + evt);
  }
}

function init() {
    
  if (prefs) {
    
    if (prefs.getItem("color")) {
    
      var color = prefs.getItem("color");

      if (DEBUG_MODE) {
        console.log("settings recovered... color: " + color);
      }
      changeColorScheme(color);
    }
  }
}

init();

heartRateMonitor.start();

updateBattery();
// Set Interval to update battery percentage every minute
setInterval(updateBattery, 60000);

checkHeartRateSensorWorking();
setInterval(checkHeartRateSensorWorking, 1000);