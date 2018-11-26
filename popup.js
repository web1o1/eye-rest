// let changeColor = document.getElementById('changeColor');
let counterElement = document.getElementById('counter');

chrome.storage.local.get('countdown', function(data) {
  let count = data.countdown - 1;
  let setCount = function() {
    count--;
    counterElement.innerHTML = count;
    if (count === 0) {
      chrome.storage.local.get('countdownMaxInSec', function(data) {
        count = data.countdownMaxInSec;
      });
    }
  }
  let counterFunc = setInterval(setCount, 1000);
});


// If the switch is set on, continue counting down
let switchButton = document.getElementById('switch');
switchButton.onclick = function() {
  let switchClasses = switchButton.classList;
  if (!switchClasses.contains('switch--on')) {
    switchClasses.add('switch--on');
    switchClasses.remove('switch--off');
    switchButton.innerHTML = 'Pause';
  } else {
    switchClasses.add('switch--off');
    switchClasses.remove('switch--on');
    switchButton.innerHTML = 'Resume';
  }
}



