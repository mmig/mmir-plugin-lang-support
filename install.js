

var fs = require('fs');
var path = require('path');

var srcDirRoot = __dirname;

function copyFiles(srcDirType, targetDir, callback){

  var srcDir = path.join(srcDirRoot, srcDirType);
  fs.readdir(srcDir, function(err, files){
    if(err){
      if(process.env.verbose) console.log('mmir-plugin-lang-support.install(): ERROR copying files, could not read source directory '+srcDir+': ', err);
      return callback && callback(err);
    }
    var count = files.length;
    if(count === 0) callback && callback(null);
    files.forEach(function(f){
      if(process.env.verbose) console.log('mmir-plugin-lang-support.install(): copying '+f+' -> ', targetDir);
      fs.copyFile(path.join(srcDir, f), path.join(targetDir, f), function(err){
        --count;
        if(err){
          if(process.env.verbose) console.log('mmir-plugin-lang-support.install(): ERROR copying '+f+': ', err);
          return callback && callback(err);
        }
        if(count === 0){
          callback && callback(null);
        }
      })
    });
  })
}

module.exports = copyFiles;
