exports.create       = create;
exports.identify     = identify;

var yi    = require('yi');
var utils = require('./utils');
var myna  = require('myna')({
  100: 'no magic numbers settings for [%s] file',
  101: 'the file used in isMatched() should have ext part',
  102: 'undefined type [%s]'
});

function identify (file, mn, callback) {
  mn = utils.safeMagicNumber(mn);

  if (callback) {
    utils.read(file, mn.length / 2, function (e, head) {
      callback(e, mn === head);
    });  
  } else {
    return mn === utils.readSync(file, mn.length / 2);
  }
}

function create (settings) {
  var config = yi.merge(require('../config'), settings);
  var whether = {
    config    : config,
    checkExt  : checkExt,
    is        : is,
    isMatched : isMatched,
    isValid   : isMatched,
    use       : use
  };

  yi.forEach(config.defs, function (name, exts) {
    whether[name] = function (callback) {
      return use.call(whether, name, callback);
    };
  });

  var chain = function (file) {
    whether.file = file;
    return whether;
  };

  chain.define = function (name, exts) {
    config.defs[name] = exts;  
  };

  return chain;
}

function use (name, callback) {
  var self = this;
  var exts = this.config.defs[name];
  var magics = [];
  var maxLength = 0;
  var e;

  if ( ! exts) {
    e = myna.speak(102, name);

    if (callback) {
      return callback(e);
    } else {
      throw e;
    }
  }

  exts.forEach(function (name) {
    var magic, length;

    if (! self.checkExt(name, callback)) { return ;}

    magic = utils.safeMagicNumber(self.config.exts[name]);
    length = magic.length;

    if (length > maxLength) { maxLength = length; }

    magics.push(magic);
  });



  if (callback) {
    utils.read(this.file, maxLength / 2, function (e, head) {
      callback(e, utils.checkHead(head, magics));
    });
  } else {
    return utils.checkHead(utils.readSync(this.file, maxLength / 2), magics);
  }
}

function is (ext, callback) {
  var mn;

  if (! this.checkExt(ext, callback)) { return ;}

  mn = this.config.exts[ext];

  if (callback) {
    identify(this.file, mn, callback);
  } else {
    return identify(this.file, mn);
  }

}

function isMatched (callback) {
  var info = this.file.split('.');
  var e;

  if (info.length == 1) {
    e = myna.speak(101);
    
    if (callback) {
      return callback(e);
    } else {
      throw e;
    }
  }

  return this.is(info[info.length - 1], callback);
}

function checkExt (ext, callback) {
  var mn = this.config.exts[ext];
  var e;

  if ( ! mn ) {
    e = myna.speak(100, ext);
    
    if (callback) {
      callback(e);
      return false;
    } else {
      throw e;
    }
  }

  return true;
}
