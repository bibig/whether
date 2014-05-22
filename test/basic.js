
var should  = require('should');
var path    = require('path');
var Whether = require('../index');
var map     = require('../config').exts;

var imagePath = path.join(__dirname, './fixtures/images');

describe('using Whether class methods', function (done) {

  it('identify png', function (done) {
    Whether.identify(path.join(imagePath, 'sample.png'), map.png, function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('identify jpg', function (done) {
    Whether.identify(path.join(imagePath, 'sample.jpg'), map.jpg, function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('identify png in sync way', function () {
    Whether.identify(path.join(imagePath, 'sample.png'), map.png).should.be.true;
  });

  it('identify jpg in sync way', function () {
    Whether.identify(path.join(imagePath, 'sample.jpg'), map.jpg).should.be.true;
  });

});

describe('test whether instance', function () {

  var whether = Whether.create();

  it('is png', function (done) {
    whether(path.join(imagePath, 'sample.png')).is('png', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('is jpg', function (done) {
    whether(path.join(imagePath, 'sample.jpg')).is('jpg', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('is png in sync', function () {
    whether(path.join(imagePath, 'sample.png')).is('png').should.be.true;
  });

  it('is jpg in sync', function () {
    whether(path.join(imagePath, 'sample.jpg')).is('jpg').should.be.true;
  });  

  it('isMatched', function (done) {
    whether(path.join(imagePath, 'sample.png')).isMatched(function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('isMatched in sync', function () {
    whether(path.join(imagePath, 'sample.jpg')).isMatched().should.be.true;
    whether(path.join(imagePath, 'sample.png')).isIdentical().should.be.true;
  });

});