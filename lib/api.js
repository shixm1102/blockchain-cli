const { clone } = require("./download");
const fs = require("fs");
const util = require("util");
const process_child = require("child_process");
const exec = util.promisify(process_child.exec);
const template = "shixm1102/blockchain-template-vue2";
module.exports.create = async (projectName) => {
  console.log(`创建项目：${projectName}`);

  // 下载git 项目
  await clone(`github:${template}`, projectName);
  console.log("下载完成");

  try {
    // await exec(`rm -rf ${}`)
    let data = fs.readFileSync(`./${projectName}/package.json`, "utf-8");
    data = JSON.parse(data);
    data.name = projectName;
    fs.writeFileSync(
      `./${projectName}/package.json`,
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    console.log("install 安装中");
    await exec(`cd ${projectName} && npm install`);
    console.log("安装完成");
  } catch (err) {
    console.log("文件解析错误", err);
  }
};
