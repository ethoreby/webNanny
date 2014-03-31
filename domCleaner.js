chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code:
      'alert("DOM cleaner run");'
  });
});
