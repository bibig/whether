var should  = require('should');
var path    = require('path');
var Whether = require('../index');

var imagePath = path.join(__dirname, './fixtures/images');


describe('default config defs', function () {
  var whether = Whether.create();

  it('test use', function (done) {
    whether(path.join(imagePath, 'sample.png')).use('isImage', function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('test use in sync', function () {
    whether(path.join(imagePath, 'sample.jpg')).use('isImage').should.be.true;
  });

  it('test config default defs, isImage', function (done) {
    whether(path.join(imagePath, 'sample.png')).isImage(function (e, result) {
      should.not.exist(e);
      should(result).be.true;
      done();
    });
  });

  it('test config default defs, isImage in sync', function () {
    whether(path.join(imagePath, 'sample.jpg')).isImage().should.be.true;
  });
});

describe('test custom def', function () {
  var whether;

  it('define a function by config', function () {
    whether = Whether.create({
      defs: {
        isCommonImage: ['jpg', 'png']
      }
    });

    whether('./text.jpg').should.have.property('isCommonImage');
    whether('./text.jpg').isCommonImage.should.be.a.Function;
  });

  it('using just defined method', function () {
    whether(path.join(imagePath, 'sample.png')).isCommonImage(function (e, result) {
      should.not.exist(e);
      result.should.be.true;
    });
  });

  it('using just defined method', function () {
    whether(path.join(imagePath, 'sample.png')).isCommonImage().should.be.true;
  });

});

describe('test define a method instantly', function () {
  var whether = Whether.create();
  
  it('define a method', function () {
    whether.define('isImage', ['gif', 'png']);
  });

  it('using just defined method', function () {
    whether(path.join(imagePath, 'sample.png')).isImage().should.be.true;
    whether(path.join(imagePath, 'sample.jpg')).isImage().should.be.false;
  });

});