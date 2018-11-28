let counterElement = document.getElementById('counter');
let switchButton = document.getElementById('switch');
let switchClasses = switchButton.classList;
let countdownInterval;

// This will get the next alarm time from storage,
// calculate that time minus the current time,
// convert to seconds, then set the popup to that time.
let updateCountdown = function() {
  chrome.storage.local.get('nextAlarmTime', function(data) {
    // This sort of prevents the race condition by choosing between
    // 0 and the actual count. We basically want to prevent the popup
    // from ever displaying a negative number.
    let count = Math.max(0, Math.ceil((data.nextAlarmTime - Date.now())/1000));
    let sec = count%60;
    let min = (count-sec)/60;
    counterElement.innerHTML = min + ':' + sec;
  });
};

// Check if isPaused. If not,
// Call the update countdown function immediately
// Then update the countdown every 0.1s
chrome.storage.local.get('isPaused', function(data) {
  if (!data.isPaused) {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 100);
    isNotPausedDisplay();
  } else {
    chrome.storage.local.get('pausedCount', function(data) {
      counterElement.innerHTML = data.pausedCount;
    });
    isPausedDisplay();
  }
});

let isNotPausedDisplay = function() {
  switchClasses.add('switch--on');
  switchClasses.remove('switch--off');
  switchButton.innerHTML = 'Pause';
};

let isPausedDisplay = function() {
  switchClasses.add('switch--off');
  switchClasses.remove('switch--on');
  switchButton.innerHTML = 'Resume';
};

// If the switch is set on, continue counting down.
// If the switch is set to off, clear the existing alarm.
switchButton.onclick = function() {
  if (!switchClasses.contains('switch--on')) {
    isNotPausedDisplay();
    chrome.storage.local.set({ isPaused: false });
    chrome.storage.local.get(['pausedCount','countdownMaxInMin'], function(data) {
      clearAndCreateAlarm(data.pausedCount/60, data.countdownMaxInMin);
    });
    countdownInterval = setInterval(updateCountdown, 100);
  } else {
    isPausedDisplay()
    chrome.storage.local.set({
      isPaused: true,
      pausedCount: parseInt(counterElement.innerHTML, 10)
    });
    clearInterval(countdownInterval);
    clearAlarm();
  }
}

// If isPaused = true, store the existing count to pass back to
// background.js, clear the existing alarm by using the date
// in storage.

// If isPaused = false, create the new alarm here.
