#!/usr/bin/env node
const program = require("commander");
const { create } = require("../lib/api");
const packages = require("../package");
program.version(packages.version);
// 巨大文字
const figlet = require("figlet");
const versionTip = figlet.textSync(packages.name);
console.log(versionTip);

// 命令提示
program.option("-v, --version", "查看版本号").action((options, command) => {
  console.log("options", options.args);
});

// 注册create命令
program
  .command("create <project-name>") // 创建项目
  .description("创建新项目")
  .action(async (name) => {
    create(name);
  });
program.parse(process.argv);
