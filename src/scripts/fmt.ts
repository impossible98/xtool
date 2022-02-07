import * as childProcess from 'child_process';
import * as os from 'os';
import * as path from 'path';

class Fmt {
    exec() {
        const commandName = 'dprint';
        const commandPath = path.join(__dirname, '..', 'node_modules', '.bin');
        if (os.platform() === 'win32') {
            const command = path.join(commandPath, `${commandName}.cmd`);
            //
            childProcess.execFile(command, ['fmt'], function(error, stdout, stderr) {
                if (error) {
                    console.error(`Error:\n ${error}`);
                }
                //
                if (stdout) {
                    console.log(`Out:\n${stdout}`);
                }
                //
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
            });
        } else {
            const command = path.join(commandPath, `${commandName}`);
            //
            childProcess.execFile(command, ['fmt'], function(error, stdout, stderr) {
                if (error) {
                    console.error(`Error:\n ${error}`);
                }
                //
                if (stdout) {
                    console.log(`Out:\n${stdout}`);
                }
                //
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                }
            });
        }
    }
}

function main() {
    const fmt = new Fmt();
    // exec command
    fmt.exec();
}

main();
