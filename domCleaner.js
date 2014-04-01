var globalCount; //returned results must be last expression
var replaceCount = 0;

var userDictionary = {}

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

  for(var key in userDictionary) {
    str = str.replace(userDictionary[key], function() {
      count++;
      return key;
    });
  }

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
    parseElements(this);
  });
});

$("body").each(function() {
  parseElements(this);
});

globalCount = replaceCount;
globalCount;