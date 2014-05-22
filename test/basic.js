
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

  it('isValid', function (done) {
    whether(path.join(imagePath, 'sample.png')).isValid(function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('isValid in sync', function () {
    whether(path.join(imagePath, 'sample.jpg')).isValid().should.be.true;
    whether(path.join(imagePath, 'sample.png')).isValid().should.be.true;
  });

});

describe('test errors', function () {

  var whether = Whether.create({
    defs: {
      isSomething: ['jpg', 'png', 'none-exist']  
    }
  });

  it('test use none defined exts', function () {

    (function () {
      whether(path.join(imagePath, 'sample.png')).is('none-exist');
    }).should.throw(/no magic numbers settings for/);

    (function () {
      whether(path.join(imagePath, 'sample.ext1')).isMatched();
    }).should.throw(/no magic numbers settings for/);

    (function () {
      whether(path.join(imagePath, 'sample.ext1')).isSomething();
    }).should.throw(/no magic numbers settings for/);

  });

  it('test use no ext file in isMatched', function () {

    (function () {
      whether(path.join(imagePath, 'sample')).isMatched();
    }).should.throw(/should have ext part/);

  });



});