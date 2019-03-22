

var fs = require('fs');
var path = require('path');

var srcDirRoot = __dirname;

function copyFiles(srcDirType, targetDir){

  var srcDir = path.join(srcDirRoot, srcDirType);
  fs.readDir(srcDir, function(files){
    files.forEach(function(f){
      console.log('mmir-plugin-lang-support.install(): copying '+f+' -> ', targetDir);
      fs.copyFile(path.join(srcDir, f), path.join(targetDir, f), function(err){
        if(err){
          console.log('mmir-plugin-lang-support.install(): ERROR copying '+f+': ', err);
        }
      })
    });
  })
}

module.exports = copyFiles;
