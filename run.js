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
      var regex = new RegExp(" " + word + " ", "gi");
      // var regex2 = new RegExp(" " + word + ".", "gi");
      // var regex3 = new RegExp(" " + word + ",", "gi");
      saveDefinition(regex, replacement, function() {
        $(".alerts").append("<div class='finished'>Definition saved: replace " + word + " with " + replacement + "</div>");
      });
    }
  });

  var saveDefinition = function(regex, replacement, callback) {
    chrome.storage.sync.set({ replacement: regex }, callback);
  };
});
