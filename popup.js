let counterElement = document.getElementById('counter');

// This will get the next alarm time from storage,
// calculate that time minus the current time,
// convert to seconds, then set the popup to that time.
let updateCountdown = function() {
  chrome.storage.local.get('nextAlarmTime', function(data) {
    // This sort of prevents the race condition by choosing between
    // 0 and the actual count. We basically want to prevent the popup
    // from ever displaying a negative number.
    let count = Math.max(0, Math.ceil((data.nextAlarmTime - Date.now())/1000));
    counterElement.innerHTML = count;
  });
};

// Call the update countdown function immediately
// Then update the countdown every 0.6s
updateCountdown();
let countdownInterval = setInterval(updateCountdown, 100);

// If the switch is set on, continue counting down.
// If the switch is set to off, clear the existing alarm.
let switchButton = document.getElementById('switch');
switchButton.onclick = function() {
  let switchClasses = switchButton.classList;
  if (!switchClasses.contains('switch--on')) {
    switchClasses.add('switch--on');
    switchClasses.remove('switch--off');
    chrome.storage.local.set({ isPaused: false });
    chrome.storage.local.get(['pausedCount','countdownMaxInMin'], function(data) {
      clearAndCreateAlarm(data.pausedCount/60, data.countdownMaxInMin);
    });
    countdownInterval = setInterval(updateCountdown, 100);
    switchButton.innerHTML = 'Pause';
  } else {
    switchClasses.add('switch--off');
    switchClasses.remove('switch--on');
    chrome.storage.local.set({
      isPaused: true,
      pausedCount: parseInt(counterElement.innerHTML, 10)
    });
    clearInterval(countdownInterval);
    clearAlarm();
    switchButton.innerHTML = 'Resume';
  }
}

// If isPaused = true, store the existing count to pass back to
// background.js, clear the existing alarm by using the date
// in storage.

// If isPaused = false, create the new alarm here.
