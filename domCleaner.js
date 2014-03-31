$(function() {
  alert("running dom cleaner");

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
    "dummy": /asshole|bitch|biatch|bastard|cocksucker|cunt|jackoff|jack off|jerkoff|scumbag|skank|slut|tosser|twat|whore/gi,
    "bum": /anal|anus|arse|butt|butthole|rectum/gi,
    "bum": / ass /gi,
    "privates": /ballsack|balls|boner|boob|clit|clitoris|cock|dick|dildo|labia|muff|pecker|penis|prick|pube|pussy|schlong|scrotum|tit|vagina/gi,
    "yuck": /jizz|piss|smegma|spunk/gi,
    " yuck ": / cum /gi,
  };

  var parseElements = function(el) {
    if(el.nodeType === 3) {       // 3 = text node
      purgeElement(el);
    }else {
      for(var i = 0; i < el.childNodes.length; i++) {
        parseElements(el.childNodes[i]);
      }
    }
  };

  var purgeElement = function(el) {
    var str = el.data;
    for(var key in dictionary) {
      str = str.replace(dictionary[key], key);
    }

    el.data = str;
  };

  $("body").each(function() {
    parseElements(this);
  });
});
