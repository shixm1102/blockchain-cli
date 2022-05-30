#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

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
  .option("-f, --force", "Overwrite target directory if it exists")
  .action(async (name) => {
    const targetDir = path.resolve(process.cwd(), name);
    if (fs.existsSync(targetDir)) {
      const chalk = await (await import("chalk")).default;
      console.log(`Target directory ${chalk.cyan(targetDir)} already exists.`);
    } else {
      create(name);
    }
  });
program.parse(process.argv);
