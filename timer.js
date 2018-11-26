// Create countdown of 20 sec
// Start counting down
// Once done, remove the window.
// Reset the Popup HTML counter to 20:00.

let timerElement = document.getElementById('timer');
let time = 20;

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}

let setTime = function() {
  timerElement.innerHTML = time + ' sec';
  time--;
  if (time === 0) {
    clearInterval(timerFunc);
    chrome.windows.getCurrent(removeWindow);
    time = 20;
  }
}

let timerFunc = setInterval(setTime, 1000);
