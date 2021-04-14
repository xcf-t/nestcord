"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringParser = void 0;
var nestcord_decorator_1 = require("../nestcord.decorator");
var StringParser = /** @class */ (function () {
    function StringParser() {
    }
    StringParser.prototype.parse = function (message, input) {
        return input;
    };
    StringParser = __decorate([
        nestcord_decorator_1.NestCord.Parser("Text")
    ], StringParser);
    return StringParser;
}());
exports.StringParser = StringParser;
//# sourceMappingURL=string.parser.js.map