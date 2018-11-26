let date = Date.now();
let countdownMaxInMin = 0.25;
let countdownMaxInSec = countdownMaxInMin * 60;
let countdownMaxInMS = countdownMaxInSec * 1000;

chrome.storage.local.set({
  date: date,
  isPaused: false
});

// Get the most recent alarm by name.
// If you find that alarm, clear it.
// Either way, create a new alarm with a new, unique name.
// Then set the countdown in storage to be passed to the popup.
chrome.alarms.get('alarmName' + date, function(alarm) {
  if (alarm) {
    chrome.alarms.clear('alarmName' + date);
  }
  chrome.alarms.create('alarmName' + date, {periodInMinutes: countdownMaxInMin});
  chrome.storage.local.set({nextAlarmTime: Date.now()+countdownMaxInMS});
});

// Add a listener for when the alarm is up.
// When the alarm is up, create a window with timer.html.
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'alarmName' + date) {
    let nextAlarmTime = alarm.scheduledTime + countdownMaxInMS;
    chrome.storage.local.set({nextAlarmTime: nextAlarmTime});

    chrome.windows.create({
      url: 'timer.html',
      width: 180,
      height: 650,
      left: 5,
      top: 100
    });
  }
});

// If isPaused = true, get the existing count and
// create an alarm where delayInMinutes is the count
// plus whatever snooze amount chosen in Options (if we want snooze)
testFunc();
