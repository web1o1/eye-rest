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

  // Create a new window
  createWindow();
};

function createWindow() {
  chrome.windows.create({width: 100, height: 100}, getCurrentWindow);
}

function getCurrentWindow() {
  chrome.windows.getCurrent({populate: true, windowType: ['popup']}, removeWindow);
}

function removeWindow(win) {
  targetWindow = win;
  chrome.windows.remove(targetWindow.id);
}