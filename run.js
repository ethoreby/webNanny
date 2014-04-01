document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.clean').addEventListener('click', function() {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "domCleaner.js" }, function(results) {
        $(".cleanPage").append("<div class='finished'> WebNanny removed " + results[0] + " words from this page.</div>");
      });
    });
  });

  $(".newDefinition").on("click", function() {

  });
});
