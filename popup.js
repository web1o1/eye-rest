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

// let setCount = function() {
//   count--;
//   counterElement.innerHTML = count;
//   if (count === 0) {
//     chrome.windows.create({url: 'timer.html', width: 100, height: 100});
//     count = 10;
//   }
// }

// let counterFunc = setInterval(setCount, 1000);

