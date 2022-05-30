module.exports.clone = async function clone(repo, desc) {
  const ora = await (await import('ora')).default;
  const { promisify } = require("util");
  const download = promisify(require("download-git-repo"));
  let process = ora(`正在下载....${repo}`);
  process.start();
  try {
    await download(repo, desc);
    process.succeed();
  } catch (error) {
    process.fail();
  }
};
