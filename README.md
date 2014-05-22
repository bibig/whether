# Whether
identify file type by file magic numbers.

## about magic numbers

+ Magic numbers are the first bits of a file which uniquely identify the type of file.
+ [see details](http://www.astro.keele.ac.uk/oldusers/rno/Computing/File_magic.html).

## Getting start

### install

```
  npm install whether
```

  check an image is exactly the given type.

```javascript
  
  var whether = require('whether').create();

  whether('path/to/image').is('jpg'); // will return boolean

  // or async way
  whether('path/to/image').is('jpg', callback);

  // check whether the file content type is matched with the file extension.
  whether('path/to/image.jpg').isMatched(); //matched with jpg type, return boolean.

  // or aync way
  whether('path/to/image.jpg').isMatched(callback);
  // isValid is an alias
  whether('path/to/image.jpg').isValid(callback);
```

## plain identify

identify a file with magic numbers. keep in mind the identify is a class method.

```javascript
  
  var Whether = require('whether');

  // identify jpg file, will return boolean
  Whether.identify('path/to/image', 'FFD8FF'); 

  // async way
  Whether.identify('path/to/image', 'FFD8FF', callback);  

``` 

## exts map defines

see the [config.js](https://github.com/bibig/whether/blob/master/config.js)

you can define your map.

```javascript
  
  // will only overwrite the exist keys
  var whether = require('whether')({
    exts: {
      'ext1': '...',
      'ext2': '...',
      'ext3': '...'
    }
  });

  // then use these defines.
  whether('path/to/image').is('ext1');
  whether('path/to/image.ext2').isMatched();

```

## define file type check methods

sometimes, we want to check a file is some kind of type. 
eg: whether a file is an image.  an image file may have different ext.

```javascript
  
  // define in config.
  var whether = require('whether')({
    defs: {
      isImage: ['png', 'gif', 'jpg', 'bmp']
    },
    exts: {...}
  });

  // use the defined methods
  whether('path/to/image').isImage();
  // async way
  whether('path/to/image').isImage(callback);

  // define instantly
  var whether = require('whether')({
    exts: {
      ext1: '...',
      ext2: '...'
    }
  });
  whether.define('isSomething', ['ext1', 'ext2']);
  // then use
  whether('path/to/file').isSomething();
  whether('path/to/file').isSomething(callback);

```

notice: all the exts used in methods definitions should have defined in the config.exts

## details
please see the test files.


## license
MIT