let clearAndCreateAlarm = function(delayInMins, periodInMins) {
  let delayInMS = delayInMins * 60000;
  chrome.storage.local.get('date', function(data) {
    chrome.alarms.get('alarmName' + data.date, function(alarm) {
      if (alarm) {
        chrome.alarms.clear('alarmName' + data.date);
      }
      chrome.alarms.create('alarmName' + data.date, {delayInMinutes: delayInMins, periodInMinutes: periodInMins});
      chrome.storage.local.set({nextAlarmTime: Date.now()+delayInMS});
    });
  });
}

let clearAlarm = function() {
  chrome.storage.local.get('date', function(data) {
    chrome.alarms.clear('alarmName' + data.date);
  });
}