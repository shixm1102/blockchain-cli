const { clone } = require("./download");
const { install } = require("./install");
const fs = require("fs");
const util = require("util");
const process_child = require("child_process");
const exec = util.promisify(process_child.exec);
const template = "shixm1102/blockchain-template-vue2";
module.exports.create = async (projectName) => {
  console.log(`创建项目：${projectName}`);

  // 下载git 项目
  // git@github.com:shixm1102/blockchain-template-vue2.git
  // shixm1102/blockchain-template-vue2
  await clone(`github:${template}`, projectName);
  console.log("下载完成");

  try {
    let data = fs.readFileSync(`./${projectName}/package.json`, "utf-8");
    data = JSON.parse(data);
    data.name = projectName;
    fs.writeFileSync(
      `./${projectName}/package.json`,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    await install(projectName);
    await exec(`cd ${projectName} && git init`);
    console.log("安装完成");
  } catch (err) {
    console.log("文件解析错误", err);
  }
};
