
import util from 'util';
import { exec, execSync } from 'child_process';
import shelljs from 'shelljs';


const newExec = util.promisify(exec);
export async function bashRunAndReturn({
    command,
    noError = false,
    showOutput = false
}) {

    try {
        const { stdout, stderr } = await newExec(command);
        if (stderr && !noError) {
            throw new Error(stderr);
        }
        if (showOutput) {
            console.log(stdout);
        }
        // remove last new line from output
        return stdout.replace(/\n$/, '');;
    }
    catch (err) {
        throw err;
    };

}

// Synchronous version of bashRunAndReturn
export function bashRunAndReturnSync({ command }) {
    try {
        const result = execSync(command, { encoding: 'utf-8' }).trim();
        return result.replace(/\n$/, '');;
    } catch (error) {
        console.error(`Error executing command: ${command}`, error);
        return null;
    }
}





export async function bashRunAndShowLogsPromise({
    command, noError = false
}) {
    await new Promise((resolve, reject) => {
        const child = shelljs.exec(
            command,
            {
                async: false,
                silent: true
            },
            (code, stdout, stderr) => { }
        );
        child.stdout.on('data', function (data) {
            if (data.includes(' SUCCESS: ')) {
                console.log(`Success ${data}`);
            } else {
                console.log(data);
            }
        });
        child.stderr.on('data', function (data) {
            if (data.includes(' WARNING: ')) {
                console.warn(data);
            } else {
                console.error(data);
                if (!noError) {
                    reject()
                }
            }
        });
        child.on('close', function (data) {
            resolve(data);
        });
    });

}