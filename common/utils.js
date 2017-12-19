// © 2017 Allie Reilly
/**
  * Common Utilities
  */

// Array of shortened Month Names
let MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/** @function
 *  @name = zeroPad (number, padLength)
 *  @param {number} number The number that needs to be padded
 *  @param {number} padLength The number of places for the number
 *     that needs to be padded
 *  @return {number} The number after it has been padded with 0s
 *  Adds zeros in front of numbers. It is often use to pad out
 *  time and month ie, 08:03:002 where the numbers 8, 3 and 2 are 
 *  padded to produce 08, 03 and 002.
 */
export function zeroPad(number, padLength) {
  
  if (padLength == 1) {
    if (number < 10) {
      number = "0" + number;
    }
  }
  if (padLength == 2) {
    if (number < 10) {
      number = "00" + number;
    }
    else if (number < 100 && number >=10) {
      number = "0" + number;
    }
  }
  return number;
}

/** @function
 *  @name = convert12Hour (hours)
 *  @param {number} hours The hour that needs to be converted
 *  @return {number} hours in 12 hour time
 *  Used to changes hours from 24 hour time to 12 hour time
 */
export function convert12Hour(hours) {
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours;
}

/** @function
 *  @name = getMonth()
 *  @returns {string} String representation of the month
 */
export function getMonth() {
  
  let today = new Date();
  let month = MONTH_NAMES[today.getMonth()];
  return month;
}

/** @function
 *  @name = getDay()
 *  @returns {number} Todays date padded if required 
 */
export function getDay() {

  let today = new Date();
  let day = zeroPad(today.getDate(), 1);
  return day;
}

/** @function
 *  @name = getHours()
 *  @returns {number} The current hour padded if required 
 */
export function getHours() {
  
  let today = new Date();
  let hours = today.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = zeroPad(hours, 1);
  return hours;
}

/** @function
 *  @name = getMinutes()
 *  @returns {number} The current minutes padded if required 
 */
export function getMinutes() {
  
  let today = new Date();
  let mins = zeroPad(today.getMinutes(), 1);
  return mins;
}

/** @function
 *  @name = getSeconds()
 *  @returns {number} The current seconds padded if required 
 */
export function getSeconds() {
  
  let today = new Date();
  let secs = zeroPad(today.getSeconds(), 1);
  return secs;
}

/** @function
 *  @name = getMiliseconds()
 *  @returns {number} The current milliseconds padded if required 
 */
export function getMilliseconds() {
  
  let today = new Date();
  let milliseconds = zeroPad(today.getMilliseconds(), 2);
  return milliseconds;
}

/** @function
 *  @name = getTime()
 *  @returns {string} The string represention of the current time
 *    including seconds ie. 08:03:02
 */
export function getTime() {
  
  return `${getHours()}:${getMinutes()}:${getSeconds()}}`
}

/** @function
 *  @name = millisecondsToDateString(duration)
 *  @param {number} duration in milliseconds
 *  @returns {Date} The date converted from milliseconds in the 
 *    date format 08:03:02.003
 */
export function millisecondsToDateString(duration) {

  var date = new Date(duration);
  date = ((new Date(duration)).toISOString().match(/(\d\d\:\d\d\:\d\d\.\d\d\d)/)[0]);
  return date;
}

/** @function
 *  @name = millisecondsToDate(duration)
 *  @param {number} duration in milliseconds
 *  @returns {Date} The date converted from milliseconds as a 
 *    date object
 */
export function millisecondsToDate(duration) {

  var date = new Date(duration);
  return date;
}