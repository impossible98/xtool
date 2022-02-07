import * as childProcess from 'child_process';
import * as os from 'os';
import * as path from 'path';

class Color {
    static green(word: string) {
        return `\x1B[32m${word}\x1B[0m`;
    }
    static red(word: string) {
        return `\x1B[31m${word}\x1B[0m`;
    }
}

class Fmt {
    exec() {
        const commandName = 'dprint';
        const commandPath = path.join(__dirname, '..', 'node_modules', '.bin');
        if (os.platform() === 'win32') {
            const command = path.join(commandPath, `${commandName}.cmd`);
            //
            childProcess.execFile(command, ['fmt'], function(error, stdout, stderr) {
                if (error) {
                    console.log(`${Color.red('Error')}:\n ${error}`);
                }
                //
                if (stdout) {
                    console.log(`${Color.green('Out')}:\n${stdout}`);
                }
                //
                if (stderr) {
                    console.log(`${Color.red('Stderr')}: ${stderr}`);
                }
            });
        } else {
            const command = path.join(commandPath, `${commandName}`);
            //
            childProcess.execFile(command, ['fmt'], function(error, stdout, stderr) {
                if (error) {
                    console.log(`${Color.red('Error')}:\n ${error}`);
                }
                //
                if (stdout) {
                    console.log(`${Color.green('Out')}:\n${stdout}`);
                }
                //
                if (stderr) {
                    console.log(`${Color.red('Stderr')}: ${stderr}`);
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
