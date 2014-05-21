
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
    Whether.identifySync(path.join(imagePath, 'sample.png'), map.png).should.be.true;
  });

  it('identify jpg in sync way', function () {
    Whether.identifySync(path.join(imagePath, 'sample.jpg'), map.jpg).should.be.true;
  });

});

describe('test whether instance', function () {

  var whether = Whether.create();

  it('is png', function (done) {
    whether.is(path.join(imagePath, 'sample.png'), 'png', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('is jpg', function (done) {
    whether.is(path.join(imagePath, 'sample.jpg'), 'jpg', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('is png in sync', function () {
    whether.is(path.join(imagePath, 'sample.png'), 'png').should.be.true;
  });

  it('is jpg in sync', function () {
    whether.is(path.join(imagePath, 'sample.jpg'), 'jpg').should.be.true;
  });  

  it('isMatched', function (done) {
    whether.isMatched(path.join(imagePath, 'sample.png'), function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('isMatched in sync', function () {
    whether.isMatched(path.join(imagePath, 'sample.jpg')).should.be.true;
    whether.isIdentical(path.join(imagePath, 'sample.png')).should.be.true;
  });


  it('isType', function (done) {
    whether.isType(path.join(imagePath, 'sample.png'), 'image', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('isType in sync', function () {
    whether.isType(path.join(imagePath, 'sample.jpg'), 'image').should.be.true;
  });


});