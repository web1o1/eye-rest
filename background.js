let date = Date.now();
let countdownMaxInMin = 1;
let countdownMaxInSec = countdownMaxInMin * 60;
let countdown = countdownMaxInSec;

let setCount = function() {
  countdown--;
  if (countdown === 0) {
    countdown = countdownMaxInSec;
  }
  chrome.storage.local.set({countdown: countdown});
}

// Set countdown max in sec to pass to popup on install.
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({countdownMaxInSec: countdownMaxInSec});
});

// Get the most recent alarm by name.
// If you find that alarm, clear it.
// Either way, create a new alarm with a new, unique name.
// Then set the countdown in storage to be passed to the popup.
chrome.alarms.get('alarmName' + date, function(alarm) {
  if (alarm) {
    chrome.alarms.clear('alarmName' + date);
  }
  chrome.alarms.create('alarmName' + date, {delayInMinutes: 1, periodInMinutes: countdownMaxInMin});
  let counterFunc = setInterval(setCount, 1000);
});

// Add a listener for when the alarm is up.
// When the alarm is up, create a window with timer.html.
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'alarmName' + date) {
    chrome.windows.create({
      url: 'timer.html',
      width: 180,
      height: 650,
      left: 5,
      top: 100
    });
  }
});


