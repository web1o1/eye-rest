let date = Date.now();
let countdownMaxInMin = 1;
let coundownMaxInSec = countdownMaxInMin * 60;
let countdown = coundownMaxInSec;

let setCount = function() {
  countdown--;
  if (countdown === 0) {
    countdown = coundownMaxInSec;
  }
  chrome.storage.sync.set({countdown: countdown});
  console.log("The countdown is: " + countdown);
}

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
      width: 300,
      height: 100,
      left: -100,
      top: 100
    });
  }
});


