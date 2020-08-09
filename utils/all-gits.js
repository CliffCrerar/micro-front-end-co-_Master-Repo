const cp = require("child_process");
const os = require("os");
const comSep = os.platform() === "win32" ? "&& " : "; ";
const message = process.argv[3];
if (process.argv[2] !== "-m" && !process.argv[3])
  throw "ERROR: Commit message not provided. Provide message as value to `-m` parameter";

const gitForEachMessage = [
  `git add --all`,
  `git commit -m '${message}'`,
  "git push",
].join(comSep);

const gitCommitPushMainRepo = [
  'git add --all',
  `git commit -m '${message}'`,
  "git push",
].join(comSep);

console.log('gitCommitPushMainRepo: ', gitCommitPushMainRepo);

console.log("gitForEachMessage: ", gitForEachMessage);

const spawnOpts = { cwd: process.cwd(), stdio: "inherit", detached: true };

try {
  // let execSub = cp.spawn(
  //   "git",
  //   ["submodule", "foreach", gitForEachMessage],
  //   spawnOpts
  // );
  //
  const sub = cp.execSync(gitCommitPushMainRepo,spawnOpts);
  console.log('sub: ', sub);

} catch (err) {
  console.error(err.message);
}
