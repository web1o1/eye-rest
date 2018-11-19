// Create countdown of 20 sec
// Start counting down
// Once done, remove the window.
// Reset the Popup HTML counter to 20:00.

let timerElement = document.getElementById('timer');
let time = 5;

let setTime = function() {
  time--;
  timerElement.innerHTML = time;
  if (time === 0) {
    clearInterval(timerFunc);
    chrome.windows.getCurrent(removeWindow);
    time = 5;
  }
}

let timerFunc = setInterval(setTime, 1000);

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}