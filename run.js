document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.clean').addEventListener('click', function() {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "domCleaner.js" }, function(results) {
        $("body").append("<div class='finished'> WebNanny removed " + results[0] + " words from this page.</div>");
      });
    });
  });

  $(".newDefinition").on("click", function() {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "domCleaner.js" });
      $("body").append("<div class'finished'> WebNanny has finished cleaning this page.</div>");
    });
  });
});
