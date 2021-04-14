"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelParser = void 0;
var nestcord_decorator_1 = require("../nestcord.decorator");
var ChannelParser = /** @class */ (function () {
    function ChannelParser() {
        this.matcher = /<#(\d{18})>/;
    }
    ChannelParser.prototype.parse = function (message, input) {
        var match = this.matcher.exec(input);
        if (!match)
            return null;
        var id = match[1];
        return message.guild.channels.resolve(id);
    };
    ChannelParser = __decorate([
        nestcord_decorator_1.NestCord.Parser("Channel")
    ], ChannelParser);
    return ChannelParser;
}());
exports.ChannelParser = ChannelParser;
//# sourceMappingURL=channel.parser.js.map