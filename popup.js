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

  // Create a new window then remove it after 20 seconds
  createWindow();
};

function createWindow() {
  chrome.windows.create({width: 100, height: 100}, getCurrentWindow);
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