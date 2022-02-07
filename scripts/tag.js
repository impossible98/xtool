"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var childProcess = require("child_process");
var fs = require("fs/promises");
var path = require("path");
var process = require("process");
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
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
var Tag = (function () {
    function Tag() {
    }
    Tag.prototype.question = function (query) {
        return new Promise(function (resolve) {
            return rl.question(query, function (answer) {
                return resolve(answer);
            });
        });
    };
    Tag.prototype.getConstants = function () {
        return __awaiter(this, void 0, void 0, function () {
            var makefilePath, data, appName, version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makefilePath = path.join(__dirname, '..', 'Makefile');
                        return [4, fs.readFile(makefilePath, 'utf-8')];
                    case 1:
                        data = _a.sent();
                        appName = data.match(/APP_NAME := (.*)/)[1];
                        version = data.match(/APP_VERSION := (.*)/)[1];
                        return [2, [appName, version]];
                }
            });
        });
    };
    Tag.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var value, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        childProcess.exec('git add --all');
                        return [4, this.getConstants()];
                    case 1:
                        value = _a.sent();
                        console.log("Do you wanna tag ".concat(value[0], " ").concat(value[1], "?"));
                        return [4, this.question('Are you sure to git commit? (y/N) ')];
                    case 2:
                        answer = _a.sent();
                        if (answer.toLowerCase() === 'y') {
                            childProcess.exec("git tag -a v".concat(value[1], " -m \"Release ").concat(value[1], "\""), function (error, stdout, stderr) {
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
                        rl.close();
                        return [2];
                }
            });
        });
    };
    return Tag;
}());
var commit = new Tag();
function main() {
    commit.exec();
}
main();
