var semver = require('semver');
var request = require('request');
var chalk = require('chalk');
var ora = require('ora');
var pkgConfig = require('../../package.json');

exports = module.exports = function checkVersion(done) {

  /**
   * 检测当前node版本是否符合要求
   */
  if (!semver.satisfies(process.version, pkgConfig.engines.node)) {
    return console.log(chalk.red(
      '  You must upgrade node to >=' + pkgConfig.engines.node + '.x to use quick-coding'
    ));
  }
  var spinner = ora('checking version...');
  spinner.start();
  request({
    url: 'https://registry.npmjs.org/quick-coding',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      var latestVersion = JSON.parse(body)['dist-tags'].latest;
      var localVersion = pkgConfig.version;
      spinner.stop();
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version of quick-coding is available.'));
        console.log();
        console.log('  latest:    ' + chalk.green(latestVersion));
        console.log('  installed: ' + chalk.red(localVersion));
        console.log();
      } else if (latestVersion == localVersion) {
        console.log();
        console.log(chalk.green(' -->  you are using the latest version of quick-coding ^_^'));
        console.log();
      }
    } else {
      spinner.stop();
    }
    done();
  });
}