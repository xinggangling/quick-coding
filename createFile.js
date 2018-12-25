var fs = require('fs');

function createFile(path, fileName) {
  var path = path || './';
  fs.mkdirSync(path, function(err) {
    if (err) {
      console.error(err)
    }
    console.log('文件: ' + path + fileName + '已创建！\n');
  })
}

createFile.prototype.checkPathIsExist = function() {
  var pathArr = path.split('/');
  var isExist = true;
  for (var i = 0; i < pathArr.length; i++) {
    var curPath = pathAry.slice(0, i + 1).join('/');
    var isExist = fs.existsSync(curPath);
    !isExist ? fs.mkdirSync(curPath) : null;
  }
}

module.exports = createFile;
