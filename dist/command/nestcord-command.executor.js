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
        return __awaiter(this, void 0, void 0, function () {
            var input, matcher, args, match, command, last, i, data, handler, perms, params, injectionMapper, result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!message.guild)
                            return [2 /*return*/];
                        if (!message.content.startsWith(this.prefix))
                            return [2 /*return*/];
                        input = message.content.substring(this.prefix.length);
                        matcher = /[^\s"]+|"([^"]*)"/gi;
                        args = [];
                        do {
                            match = matcher.exec(input);
                            if (match != null)
                                args.push(match[1] ? match[1] : match[0]);
                        } while (match != null);
                        command = __spreadArray([], args);
                        for (i = 0; i < args.length; i++) {
                            data = command.map(function (x) { return x.toLowerCase(); });
                            handler = this.registry.getCommand(data);
                            if (handler) {
                                last = handler;
                                break;
                            }
                            command.pop();
                        }
                        if (!last)
                            return [2 /*return*/];
                        perms = Reflect.getMetadata(constants_1.NESTCORD_PERMISSION, last.instance.constructor);
                        if (perms && !message.member.hasPermission(perms, { checkAdmin: true, checkOwner: true }))
                            return [2 /*return*/];
                        params = args.slice(command.length);
                        injectionMapper = this.parser.parse(message, last, params);
                        if (!injectionMapper)
                            return [2 /*return*/, this.sendHelpEmbed(message, command, last)];
                        return [4 /*yield*/, (_a = last.instance.execute).call.apply(_a, __spreadArray([last.instance], injectionMapper))];
                    case 1:
                        result = _b.sent();
                        if (result === false)
                            return [2 /*return*/, this.sendHelpEmbed(message, command, last)];
                        return [2 /*return*/];
                }
            });
        });
    };
    NestcordCommandExecutor.prototype.sendHelpEmbed = function (message, command, executor) {
        var embed = new discord_js_1.MessageEmbed();
        var description = '';
        for (var _i = 0, _a = executor.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            if (param.optional)
                description += "(" + Reflect.getMetadata(constants_1.NESTCORD_PARSER_NAME, param.parser) + " " + param.name + ") ";
            else
                description += "[" + Reflect.getMetadata(constants_1.NESTCORD_PARSER_NAME, param.parser) + " " + param.name + "] ";
        }
        embed.setDescription(description);
        embed.setTitle(this.prefix + command.map(function (x) { return x.toLowerCase(); }).join(" "));
        message.channel.send(embed).then(function () { return null; });
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