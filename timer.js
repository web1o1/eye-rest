// Create countdown of 20 sec
// Start counting down
// Once done, remove the window.
// Reset the Popup HTML counter to 20:00.

let timerElement = document.getElementById('timer');
let time = 5;

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}

let setTime = function() {
  timerElement.innerHTML = time + ' sec';
  if (time === 0) {
    chrome.windows.getCurrent(removeWindow);
  }
  time--;
}

setTime();
let timerFunc = setInterval(setTime, 1000);
