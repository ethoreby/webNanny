$(function() {

  var dictionary = {
    "gosh darn": /Goddamn|God damn/gi,
    "dang": /damn/gi,
    "flip": /feck|fuck/gi,
    "heck": /hell/gi,
    "poo": /shit|turd/gi,
    " poo ": / crap /gi,
    "friend": /nigger|nigga|pimp/gi,
    "guy": /coon|dyke|faggot|fag|fudgepacker|fudge packer|homo|queer/gi,
    "sleepover": /blowjob|blow job|fellate|fellatio|orgasm|sex|wank/gi,
    "dummy": /assclown|asscrack|assface|assfuck|asshat|asshole|bitch|biatch|bastard|cocksucker|cunt|jackass|jackoff|jack off|jerkoff|scumbag|skank|slut|tosser|twat|whore/gi,
    "bum": /anal|anus|arse|butt|butthole|rectum/gi,
    " bum ": / ass /gi,
    "privates": /ballsack|balls|boner|boob|clit|clitoris|cock|dick|dildo|labia|muff|pecker|penis|prick|pube|pussy|schlong|scrotum|tit|vagina/gi,
    "yuck": /jizz|piss|smegma|spunk/gi,
    " yuck ": / cum /gi
  };

  var parseElements = function(el) {
    if(el.nodeType === 3) {       // 3 = text node
      replaceCount += purgeElement(el);
    }else {
      for(var i = 0; i < el.childNodes.length; i++) {
        parseElements(el.childNodes[i]);
      }
    }
  };

  var purgeElement = function(el) {
    var count = 0;
    var str = el.data;

    // chrome.storage.get(null, function(userDictionary) {
    //   alert(JSON.stringify(userDictionary));
    // });

    for(var key in dictionary) {
      str = str.replace(dictionary[key], function() {
        count++;
        return key;
      });
    }

    el.data = str;
    return count;
  };

  var replaceCount = 0;

  $("body").each(function() {
    parseElements(this);
  });

  // return replaceCount;
  globalCount = replaceCount;
  // alert("WebNanny removed " + replaceCount + " profane words.");
});

var globalCount; //returned results must be last expression
globalCount;
