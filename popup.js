let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'document.body.style.backgroundColor = "' + color + '";'});
  });
};

// If the switch is set on, continue counting down
//
let switchButton = document.getElementById('switch');
switchButton.onclick = function() {
  let switchClasses = switchButton.classList;
  if (!switchClasses.contains('switch--on')) {
    switchClasses.add('switch--on');
    switchClasses.remove('switch--off');
  } else {
    switchClasses.add('switch--off');
    switchClasses.remove('switch--on');
  }
}

// Create a new window every 20 minutes (test at 10s)
// Then remove it after 20 seconds (test at 1s)
createWindow();


function createWindow() {
  chrome.windows.create({url: 'timer.html', width: 100, height: 100}, getCurrentWindow);
}

function getCurrentWindow(currentWindow) {
  chrome.windows.get(currentWindow.id, setTimeout(removeWindow, 3000));
  // chrome.tabs.query({active: true}, function(tabs) {
  //   chrome.tabs.remove(tabs[tabs.length].id);
  // });
}

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}

// If the extension is running,
// If the user has not clicked pause on the Popup HTML,
// If the counter in the Popup HTML is down to 00:00,

// Open a new window and set that Timer HTML to 20 sec
// If the Timer HTML is down to 0 sec,
// Close that new window,
// Reset the Popup HTML counter to 20:00.


// var counter = 10;
// var newYearCountdown = setInterval(function(){
//   console.log(counter);
//   counter--
//   if (counter === 0) {
//     console.log("HAPPY NEW YEAR!!");
//     clearInterval(newYearCountdown);
//   }
// }, 1000);