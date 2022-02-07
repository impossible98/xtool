"use strict";
exports.__esModule = true;
var childProcess = require("child_process");
var os = require("os");
var path = require("path");
var Color = (function () {
    function Color() {
    }
    Color.green = function (word) {
        return "\u001B[32m".concat(word, "\u001B[0m");
    };
    Color.red = function (word) {
        return "\u001B[31m".concat(word, "\u001B[0m");
    };
    return Color;
}());
var Fmt = (function () {
    function Fmt() {
    }
    Fmt.prototype.exec = function () {
        var commandName = 'dprint';
        var commandPath = path.join(__dirname, '..', 'node_modules', '.bin');
        if (os.platform() === 'win32') {
            var command = path.join(commandPath, "".concat(commandName, ".cmd"));
            childProcess.execFile(command, ['fmt'], function (error, stdout, stderr) {
                if (error) {
                    console.log("".concat(Color.red('Error'), ":\n ").concat(error));
                }
                if (stdout) {
                    console.log("".concat(Color.green('Out'), ":\n").concat(stdout));
                }
                if (stderr) {
                    console.log("".concat(Color.red('Stderr'), ": ").concat(stderr));
                }
            });
        }
        else {
            var command = path.join(commandPath, "".concat(commandName));
            childProcess.execFile(command, ['fmt'], function (error, stdout, stderr) {
                if (error) {
                    console.log("".concat(Color.red('Error'), ":\n ").concat(error));
                }
                if (stdout) {
                    console.log("".concat(Color.green('Out'), ":\n").concat(stdout));
                }
                if (stderr) {
                    console.log("".concat(Color.red('Stderr'), ": ").concat(stderr));
                }
            });
        }
    };
    return Fmt;
}());
function main() {
    var fmt = new Fmt();
    fmt.exec();
}
main();
