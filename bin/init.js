#!/usr/bin/env node

// 引入依赖
var fs = require('fs');
var path = require('path');
var ora = require('ora');
var chalk = require('chalk');
var tildify = require('tildify');
var inquirer = require('inquirer');
var home = require('user-home');
var rm = require('rimraf').sync;
var download = require('./cli/download');
var localPath = require('./cli/local-path');
var checkVersion = require('./cli/check-version');
var generate = require('./cli/generate');
var logger = require('./cli/logger');

module.exports = function init(template, rawName, program) {
  function gen(templatePath) {
    console.log(name, templatePath, to)
    // generate(name, templatePath, to, function (err) {
    //   if (err) logger.fatal(err);
    //   console.log();
    //   logger.success('Generated "%s".', name);
    // });
  }

  function run() {
    if (localPath.isLocalPath(template)) {
      // use local/cache template
      // Example:
      // wepy init E:\workspace\wepy_templates\standard my-wepy-project
      // wepy init standard my-wepy-project --offline
      const templatePath = localPath.getTemplatePath(template);
      if (fs.existsSync(templatePath)) {
        gen(templatePath);
      } else {
        logger.fatal('Local template "%s" not found.', template);
      }
    } else {
      checkVersion(function() {
        downloadAndGenerate(template);
      });
    }
  }

  function downloadAndGenerate(template) {
    const spinner = ora('downloading template');
    spinner.start();

    if (fs.existsSync(tmp)) {
      rm(tmp);
    }
    // console.log('fs.existsSync(tmp): ', tmp)
    if (!hasSlash) {
      // use official template .... githubIssueDemo
      download.downloadOfficialZip(template, tmp, { extract: true }).then(() => {
        spinner.stop()
        gen(tmp);
      }).catch(e => {
        if (e.statusCode === 404) {
          logger.fatal(`Unrecongnized template: "${template}". Try "quick-coding list" to show all available templates `);
        } else if (e) {
          logger.fatal('Failed to download repo ' + template + ': ' + e.message.trim());
        }
      });
    } else {
      // use third party template
      download.downloadRepo(template, tmp, { clone }, err => {
        spinner.stop();
        if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim());
        gen(tmp);
      });
    }
  }

  var hasSlash = template.indexOf('/') > -1; // 模版中是否存在斜杠
  var inPlace = !rawName || rawName === '.';
  var name = inPlace ? path.relative('../', process.cwd()) : rawName;
  var to = path.resolve(rawName || '.');
  var clone = program.clone || false;
  var offline = program.offline || false;
  let tmp = path.join(home, '.quick_coding_templates', template.replace(/\//g, '-'));

  /**
   * use offline cache
   */
  if (offline) {
    console.log(`> Use cached template at ${chalk.yellow(tildify(tmp))}`);
    template = tmp;
  }

  if (fs.existsSync(to)) {
    inquirer.prompt([{
      type: 'confirm',
      message: inPlace
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?',
      name: 'ok'
    }]).then(answers => {
      if (answers.ok) {
        run();
      }
    }).catch();
  } else {
    run();
  }

}
