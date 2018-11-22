let date = Date.now();

// chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#3aa757', minCounter: 10, secTimer: 5}, function() {
  //   console.log("The color is green.");
  // });

  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostEquals: 'developer.chrome.com'},
  //     })
  //     ],
  //       actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });

  console.log('on installed called')

  chrome.alarms.get('coop' + date, function(alarm) {
    console.log('i got an alarm: ' + alarm);
    if (alarm) {
      console.log('i got an alarm and its name is: ' + alarm.name)
      chrome.alarms.clear('coop' + date, function() {
        chrome.alarms.getAll(function(alarms) {
          console.log('an array of alarms was found with length: ' + alarms.length);
        });
      });
    }
    chrome.alarms.create('coop' + date, {delayInMinutes: 0.1, periodInMinutes: 0.2});
    console.log('alarm maybe created');
  });

// });

// This script should be persistent.
// It should look for the count variable from popup.js

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'coop' + date) {
    chrome.windows.create({url: 'timer.html', width: 300, height: 100})
    console.log('on alarm if the alarm name is coop create a window: ' + alarm.name + ' ' + (Date.now()-date)/1000)
  }
});