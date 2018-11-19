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

let counterElement = document.getElementById('counter');
let count = 10;

let setCount = function() {
  count--;
  counterElement.innerHTML = count;
  if (count === 0) {
    clearInterval(counterFunc);
    chrome.windows.create({url: 'timer.html', width: 100, height: 100});
    count = 10;
  }
}

let counterFunc = setInterval(setCount, 1000);

// Alternatively, create a snooze for x amount of time.
// Maybe create a reset button as well (to reset the count back up to 20 min)

// If the extension is running,
// If the user has not clicked pause on the Popup HTML,
// If the counter in the Popup HTML is down to 00:00,

// Open a new window and set that Timer HTML to 20 sec
// If the Timer HTML is down to 0 sec,
// Close that new window,
// Reset the Popup HTML counter to 20:00.
