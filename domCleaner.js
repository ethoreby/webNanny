var globalCount; //returned results must be last expression
var replaceCount = 0;

var userDictionary = {}

var baseDictionary = {
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

var parseElements = function(el, dictionary) {
  if(el.nodeType === 3) {       // 3 = text node
    replaceCount += purgeElement(el, dictionary);
  }else {
    for(var i = 0; i < el.childNodes.length; i++) {
      parseElements(el.childNodes[i], dictionary);
    }
  }
};

var purgeElement = function(el, dictionary) {
  var count = 0;
  var str = el.data;

  for(var key in dictionary) {
    str = str.replace(dictionary[key], function() {
      count++;
      return key;
    });
  }

  el.data = str;
  return count;
};

chrome.storage.sync.get(null, function(data) {
  for(var key in data) {
    var regex = new RegExp(data[key], "gi");
    userDictionary[key] = regex;
  }

  $("body").each(function() {
    parseElements(this, userDictionary);
  });
});

$("body").each(function() {
  parseElements(this, baseDictionary);
});

globalCount = replaceCount;
globalCount;