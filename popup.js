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

// Create a new window then remove it after 20 seconds
setInterval(createWindow, 2000);

function createWindow() {
  chrome.windows.create({url: 'timer.html', width: 100, height: 100}, getCurrentWindow);
}

function getCurrentWindow(currentWindow) {
  chrome.windows.get(currentWindow.id, removeWindow);
  // chrome.tabs.query({active: true}, function(tabs) {
  //   chrome.tabs.remove(tabs[tabs.length].id);
  // });
}

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}