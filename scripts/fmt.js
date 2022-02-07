"use strict";
exports.__esModule = true;
var childProcess = require("child_process");
var os = require("os");
var path = require("path");
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
                    console.error("Error:\n ".concat(error));
                }
                if (stdout) {
                    console.log("Out:\n".concat(stdout));
                }
                if (stderr) {
                    console.error("stderr: ".concat(stderr));
                }
            });
        }
        else {
            var command = path.join(commandPath, "".concat(commandName));
            childProcess.execFile(command, ['fmt'], function (error, stdout, stderr) {
                if (error) {
                    console.error("Error:\n ".concat(error));
                }
                if (stdout) {
                    console.log("Out:\n".concat(stdout));
                }
                if (stderr) {
                    console.error("stderr: ".concat(stderr));
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
