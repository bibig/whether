exports.safeMagicNumber = safeMagicNumber;
exports.checkHead       = checkHead;
exports.read            = read;
exports.readSync        = readSync;

var fs    = require('fs');

function safeMagicNumber (mn) {
  return mn.replace(/\s/g, '').toLowerCase();
}

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