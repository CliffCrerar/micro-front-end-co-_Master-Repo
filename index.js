
const cp = require('child_process');

if (process.argv[2] !== '-m' && !process.argv[3]) throw 'ERROR: Commit message not provided. Provide message as value to `-m` parameter';

const message = process.argv[3];

const comSep = require('os').platform() === 'win32' ? '&& ' : '; ';

console.log('message: ', message);

const gitForEachMessage = [`git add --all`, `git commit -m '${message}'`, 'git push'].join(comSep);

const gitCommitPushMainRepo = ['git --add all', `git commit '${message}'`, 'git push'].join(comSep);

console.log('gitForEachMessage: ', gitForEachMessage);

const spawnOpts = { cwd: process.cwd(), stdio: 'inherit', detached: true };

try {
    let execSub = cp.spawn('git', ['submodule', 'foreach', gitForEachMessage, gitCommitPushMainRepo],spawnOpts);

    // let execMain = cp.spawn(gitCommitPushMainRepo,spawnOpts);
    
    [execMain,execSub].forEach(ex=>{
        ex.on('data', (data) => console.log('LOG:', data));
        ex.on('error', (err) => {
            console.error(err);
            process.exit();
        })
    })
} catch(err){
    console.error(err.message);
}





