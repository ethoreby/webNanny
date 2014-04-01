document.addEventListener('DOMContentLoaded', function() {

  document.querySelector('.clean').addEventListener('click', function() {
    chrome.tabs.executeScript(null, { file: "jquery.min.js" }, function() {
      chrome.tabs.executeScript(null, { file: "domCleaner.js" }, function(results) {
        $(".alerts").empty();
        $(".alerts").append("<div class='finished'> WebNanny removed " + results[0] + " words from this page.</div>");
      });
    });
  });

  $(".newDefinition").on("click", function() {
    var word = $(".ipWord").val();
    var replacement = $(".ipReplacement").val();
    $(".alerts").empty();

    if(word.length === 0 || replacement.length === 0) {
      $(".alerts").append("<div class='error'>Oops! Please enter a word and a replacement definition.</div>");
    }else {
      saveDefinition(word, replacement, function() {
        $(".alerts").append("<div class='finished'>Definition saved: replace " + word + " with " + replacement + "</div>");
      });
    }
  });

  var saveDefinition = function(word, replacement, callback) {
    var newDef = {};
    newDef[replacement] = "" + word;
    chrome.storage.sync.set(newDef, callback);

    chrome.storage.sync.get(null, function(results) {
      alert(JSON.stringify(results));
    });
  };

  chrome.storage.sync.clear();    //TESTING ONLY
});
