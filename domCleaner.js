$(function() {
  alert("running dom cleaner");

  var parseElements = function(el) {

    if(el.nodeType === 3) {
      purgeElement(el);
    }else {
      for(var i = 0; i < el.childNodes.length; i++) {
        parseElements(el.childNodes[i]);
      }
    }
  };

  var purgeElement = function(el) {
    var re = /mariner/gi;
    var str = el.data;
    var str = str.replace(re, "seahawk");

    el.data = str;
  };

  $("p").each(function() {
    parseElements(this);
  });
});
