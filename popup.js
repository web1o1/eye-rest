// let changeColor = document.getElementById('changeColor');
let counterElement = document.getElementById('counter');

chrome.storage.sync.get('countdown', function(data) {
  let count = data.countdown - 1;
  let setCount = function() {
    count--;
    counterElement.innerHTML = count;
    if (count === 0) {
      count = data.countdown;
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
  } else {
    switchClasses.add('switch--off');
    switchClasses.remove('switch--on');
  }
}



