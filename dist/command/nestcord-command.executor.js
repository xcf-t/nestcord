"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestcordCommandExecutor = void 0;
var discord_js_1 = require("discord.js");
var nestcord_decorator_1 = require("../nestcord.decorator");
var common_1 = require("@nestjs/common");
var nestcord_command_registry_1 = require("./nestcord-command.registry");
var nestcord_command_parser_1 = require("./nestcord-command.parser");
var constants_1 = require("../constants");
var NestcordCommandExecutor = /** @class */ (function () {
    function NestcordCommandExecutor(registry, parser) {
        this.registry = registry;
        this.parser = parser;
        this.prefix = '!';
    }
    NestcordCommandExecutor.prototype.handle = function (client, message) {
        var _a;
        if (!message.content.startsWith(this.prefix))
            return;
        var input = message.content.substring(this.prefix.length);
        var matcher = /[^\s"]+|"([^"]*)"/gi;
        var args = [];
        var match;
        do {
            match = matcher.exec(input);
            if (match != null)
                args.push(match[1] ? match[1] : match[0]);
        } while (match != null);
        var command = __spreadArray([], args);
        var last;
        for (var i = 0; i < args.length; i++) {
            var data = command.map(function (x) { return x.toLowerCase(); });
            var handler = this.registry.getCommand(data);
            if (handler) {
                last = handler;
                break;
            }
            command.pop();
        }
        if (!last)
            return;
        var params = args.slice(command.length);
        var injectionMapper = this.parser.parse(message, last, params);
        console.log(injectionMapper);
        if (!injectionMapper) {
            var embed = new discord_js_1.MessageEmbed();
            var description = '';
            for (var _i = 0, _b = last.parameters; _i < _b.length; _i++) {
                var param = _b[_i];
                if (param.optional)
                    description += "(" + Reflect.getMetadata(constants_1.NESTCORD_PARSER_NAME, param.parser) + " " + param.name + ") ";
                else
                    description += "[" + Reflect.getMetadata(constants_1.NESTCORD_PARSER_NAME, param.parser) + " " + param.name + "] ";
            }
            embed.setDescription(description);
            embed.setTitle(this.prefix + command.map(function (x) { return x.toLowerCase(); }).join(" "));
            message.channel.send(embed).then(function () { return null; });
            return;
        }
        (_a = last.instance.execute).call.apply(_a, __spreadArray([last.instance], injectionMapper));
    };
    NestcordCommandExecutor = __decorate([
        common_1.Injectable(),
        nestcord_decorator_1.NestCord.Event('message'),
        __metadata("design:paramtypes", [nestcord_command_registry_1.NestCordCommandRegistry,
            nestcord_command_parser_1.NestCordCommandParser])
    ], NestcordCommandExecutor);
    return NestcordCommandExecutor;
}());
exports.NestcordCommandExecutor = NestcordCommandExecutor;
//# sourceMappingURL=nestcord-command.executor.js.map