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
    saveDefinition();
  });

  $(".ipWord").keyup(function(event) {
    if(event.keyCode === 13) {
      saveDefinition();
    }
  });

  $(".ipReplacement").keyup(function(event) {
    if(event.keyCode === 13) {
      saveDefinition();
    }
  });

  $(".resetDefinitions").on("click", function() {
    chrome.storage.sync.clear();
    $(".alerts").append("<div class='finished'>Custom definitions have been cleared.</div>");
  });

  var saveDefinition = function() {
    var word = $(".ipWord").val();
    var replacement = $(".ipReplacement").val();
    $(".ipWord").val("");
    $(".ipReplacement").val("");
    $(".alerts").empty();

    if(word.length === 0 || replacement.length === 0) {
      $(".alerts").append("<div class='error'>Oops! Please enter a word and a replacement definition.</div>");
    }else {
      var newDef = {};
      newDef[replacement] = "" + word;
      chrome.storage.sync.set(newDef, function() {
        $(".alerts").append("<div class='finished'>Definition saved: replace " + word + " with " + replacement + "</div>");
      });
    }
  };
});
