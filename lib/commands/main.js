const program = require('commander');
const pkgVersion = require('../../package.json').version;
const logUpdate = require('log-update');
const chalk = require('chalk');
const shell = require('shelljs');
const elegantSpinner = require('elegant-spinner');
const clone = require('git-shallow-clone')


const frame = elegantSpinner();

program
  .version(pkgVersion)
  .usage('app_name')
  .description('Get started with TTN Bootcamp(MEAN)')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
}

if (program.args.length === 1) {
  if (shell.test('-d', program.args[0])) {
    console.log(chalk.red(`${program.args[0]} directory already exits! Please choose another name!!!`));
    shell.exit(1);
  }

  shell.mkdir('-p', program.args[0]);
  shell.cd(program.args[0]);
  shell.exec('git init');

  const interval = setInterval(() => {
    logUpdate(`Fetching the TTN Boilerplate...${chalk.cyan.bold.dim(frame())}`);
	}, 50);

  const url = 'git@github.com:10uei011/bootcamp.git';

  clone(url, function (err) {
    clearInterval(interval);
    logUpdate.clear();
    if (err) {
      console.log(chalk.red.bold('Error! Try again'));
      shell.exit(1);
    }
    console.log(chalk.green.bold('Completed.....You are good to go!'));
  })
}