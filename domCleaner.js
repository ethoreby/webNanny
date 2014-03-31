$(function() {
  alert("running dom cleaner");

  var dictionary = {
    "mariner": "REPLACED!",
    "mariners": "REPLACED!"
  };

  $("h1").each(function() {
    if($(this).text) {            //check if the current element has text

      var words = $(this).text().split(" ");
      for(var i = 0; i < words.length; i++) {
        var word = words[i];
        if(dictionary[word.toLowerCase()]) {
          words[i] = dictionary[word.toLowerCase()];
        }
      }
      $(this).text(words.join(" "));
    }
  });

});
