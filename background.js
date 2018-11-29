let date = Date.now();
let countdownMaxInMin = 20;
let countdownMaxInSec = countdownMaxInMin * 60;
let countdownMaxInMS = countdownMaxInSec * 1000;

new chrome.declarativeContent.ShowPageAction();

chrome.storage.local.set({
  date: date,
  isPaused: false,
  countdownMaxInMin: countdownMaxInMin
});

clearAndCreateAlarm(countdownMaxInMin,countdownMaxInMin);

// Add a listener for when the alarm is up.
// When the alarm is up, create a window with timer.html.
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'alarmName' + date) {
    let nextAlarmTime = alarm.scheduledTime + countdownMaxInMS;
    chrome.storage.local.set({nextAlarmTime: nextAlarmTime});

    chrome.windows.create({
      url: 'timer.html',
      width: 600,
      height: 550,
      left: 5,
      top: 100
    });
  }
});

// If isPaused = true, get the existing count and
// create an alarm where delayInMinutes is the count
// plus whatever snooze amount chosen in Options (if we want snooze)
