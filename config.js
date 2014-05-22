// http://www.astro.keele.ac.uk/oldusers/rno/Computing/File_magic.html
// http://en.wikipedia.org/wiki/List_of_file_signatures
// http://asecuritysite.com/forensics/magic

module.exports = {
  
  // will add to Whether.prototype
  defs: {
    isImage: ['jpg', 'png', 'gif', 'bmp']
  },

  exts: {
    'jpg'  : 'FF D8 FF',
    'png'  : '89 50 4E 47',
    'gif'  : '47 49 46 38',
    'bmp'  : '42 4D',
    'tif'  : '49 49',
    'nif'  : '49 49 4e 31',
    'ico'  : '00 00 01 00',
    'psd'  : '38 42 50 53',
    
    'rar'  : '52 61 72 21 1A 07',
    'zip'  : '50 4B 03 04',
    'gz'   : '1F 8B 08',
    'tar'  : '75 73 74 61 72',
    'msi'  : 'D0 CF 11 E0 A1 B1 1A E1',
    'iso'  : '43 44 30 30 31',
    
    'rtf'  : '7B 5C 72 74 66 31',
    
    'avi'  : '52 49 46 46',
    'mov'  : '6D 6F 6F 76',
    'wmv'  : '30 26 B2 75 8E 66 CF',
    'wma'  : '30 26 B2 75 8E 66 CF',
    'swf'  : '46 57 53',
    'flv'  : '46 4C 56',
    
    'mid'  : '4D 54 68 64',
    
    'pdf'  : '25 50 44 46',
    'doc'  : 'D0 CF 11 E0 A1 B1 1A E1',
    'xls'  : 'D0 CF 11 E0 A1 B1 1A E1',
    'ppt'  : 'D0 CF 11 E0 A1 B1 1A E1',
    'docx' : '50 4B 03 04',
    'xlsx' : '50 4B 03 04',
    'pptx' : '50 4B 03 04',
    
    'mp3'  : '49 44 43'
  }
  

};