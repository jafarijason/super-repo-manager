
import util from 'util';
import { exec } from 'child_process';



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