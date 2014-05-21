exports.create       = create;
exports.identify     = identify;
exports.identifySync = identifySync;



var fs = require('fs');
var yi = require('yi');
var myna = require('myna')({
  100: 'no magic numbers settings for [%s] file',
  101: 'the file used in isMatched() should have ext part',
  102: 'undefined type [%s]'
});

var config = require('../config');

function create (settings) {
  return new Whether(settings);
}

function Whether (settings) {
  this.config = yi.merge(config, settings);
}

/*Whether.prototype.initMethods () {
  var self = this;

  yi.forEach(this.config.methods, function (name, exts) {
    Whether.prototype[name] = 
  });
}*/

Whether.prototype.isType = function (file, type, callback) {
  var self = this;
  var exts = this.config['types'][type];
  var magics = [];
  var maxLength = 0;
  var e;

  if ( ! exts) {
    e = myna.speak(102, type);

    if (callback) {
      return callback(e);
    } else {
      throw e;
    }
  }

  exts.forEach(function (name) {
    var magic = safeMagicNumber(self.config.exts[name]);
    var length = magic.length;

    if (length > maxLength) { maxLength = length; }

    magics.push(magic);
  });



  if (callback) {
    read(file, maxLength / 2, function (e, head) {
      callback(e, checkHead(head, magics));
    });
  } else {
    return checkHead(readSync(file, maxLength / 2), magics);
  }
};

function checkHead (head, magics) {
  var result = false;

  magics.forEach(function (magic) {
    if (result) return;

    if (head.indexOf(magic) === 0) {
      result = true;
    }
  });

  return result;
}

Whether.prototype.is = function (file, ext, callback) {
  var mn = this.config.exts[ext];
  var e;

  if ( ! mn ) {
    e = myna.speak(100, ext);
    
    if (callback) {
      return callback(e);
    } else {
      throw e;
    }
  }

  if (callback) {
    identify(file, mn, callback);
  } else {
    return identifySync(file, mn);
  }

};

Whether.prototype.isMatched = Whether.prototype.isIdentical =function (file, callback) {
  var info = file.split('.');
  var e;

  if (info.length == 1) {
    e = myna.speak(101);
    
    if (callback) {
      return callback(e);
    } else {
      throw e;
    }
  }

  // console.log(info);

  return this.is(file, info[info.length - 1], callback);
};

function safeMagicNumber (mn) {
  return mn.replace(/\s/g, '').toLowerCase();
}

function identify (file, mn, callback) {
  mn = safeMagicNumber(mn);

  read(file, mn.length / 2, function (e, head) {
    callback(e, mn === head);
  });
}

function identifySync (file, mn) {
  mn = safeMagicNumber(mn);
  return mn === readSync(file, mn.length / 2);
}

function read (file, length, callback) {

  fs.open(file, 'r', function (e, fd) {
    var buffer;

    if (e) { return callback(e); }

    buffer = new Buffer(length);

    fs.read(fd, buffer, 0, length, 0, function (e, bytesRead, buffer) {
      callback(e, buffer.toString('hex', 0, bytesRead));
    });

  });
}

function readSync (file, length) {
  var buffer = new Buffer(length);
  var fd, bytesRead;

  try{
    fd = fs.openSync(file, 'r');
    bytesRead = fs.readSync(fd, buffer, 0, length, 0);

    return buffer.toString('hex', 0, bytesRead);
  } catch (e) {
    return false;
  }
}

