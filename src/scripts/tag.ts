import * as childProcess from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Color {
    static green(word: string) {
        return `\x1B[32m${word}\x1B[0m`;
    }
    static red(word: string) {
        return `\x1B[31m${word}\x1B[0m`;
    }
}

class Tag {
    question(query) {
        return new Promise(function(resolve) {
            return rl.question(query, function(answer) {
                return resolve(answer);
            });
        });
    }

    async getConstants() {
        const makefilePath = path.join(__dirname, '..', 'Makefile');
        const data = await fs.readFile(makefilePath, 'utf-8');
        const appName = data.match(/APP_NAME := (.*)/)[1];
        const version = data.match(/APP_VERSION := (.*)/)[1];

        return [appName, version];
    }

    async exec() {
        childProcess.exec('git add --all');
        //
        const value = await this.getConstants();
        console.log(`Do you wanna tag ${value[0]} ${value[1]}?`);
        let answer: string | any = await this.question('Are you sure to git commit? (y/N) ');

        if (answer.toLowerCase() === 'y') {
            childProcess.exec(`git tag -a v${value[1]} -m "Release ${value[1]}"`, function(error, stdout, stderr) {
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

        rl.close();
    }
}
const commit = new Tag();

function main() {
    commit.exec();
}

main();
