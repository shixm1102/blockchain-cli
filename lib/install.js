module.exports.install = async function clone(projectName, desc) {
  const ora = await (await import("ora")).default;
  const util = require("util");
  const process_child = require("child_process");
  const exec = util.promisify(process_child.exec);
  let process = ora(`install 安装中...`);
  process.start();
  try {
    await exec(`cd ${projectName} && npm install`);
    process.succeed();
  } catch (error) {
    process.fail();
  }
};
