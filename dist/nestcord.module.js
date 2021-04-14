"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCordModule = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
var discord_js_1 = require("discord.js");
var nestcord_event_module_1 = require("./event/nestcord-event.module");
var nestcord_command_module_1 = require("./command/nestcord-command.module");
var nestcord_parser_module_1 = require("./parser/nestcord-parser.module");
var NestCordModule = /** @class */ (function () {
    function NestCordModule() {
    }
    NestCordModule_1 = NestCordModule;
    NestCordModule.forRoot = function (options) {
        var providers = [
            NestCordModule_1.createClient(),
            NestCordModule_1.createClientLogin(),
            NestCordModule_1.createConfig(options),
        ];
        return {
            imports: [nestcord_event_module_1.NestCordEventModule, nestcord_command_module_1.NestCordCommandModule, nestcord_parser_module_1.NestCordParserModule],
            module: NestCordModule_1,
            providers: providers,
            exports: providers,
            global: true,
        };
    };
    NestCordModule.createConfig = function (options) {
        return {
            provide: constants_1.NESTCORD_CONFIG,
            useValue: options,
        };
    };
    NestCordModule.createClient = function () {
        return {
            provide: discord_js_1.Client,
            inject: [constants_1.NESTCORD_CONFIG],
            useFactory: function (config) { return new discord_js_1.Client(config); },
        };
    };
    NestCordModule.createClientLogin = function () {
        return {
            provide: constants_1.NESTCORD_LOGIN,
            inject: [constants_1.NESTCORD_CONFIG, discord_js_1.Client],
            useFactory: function (config, client) { return client.login(config.token); },
        };
    };
    var NestCordModule_1;
    NestCordModule = NestCordModule_1 = __decorate([
        common_1.Module({})
    ], NestCordModule);
    return NestCordModule;
}());
exports.NestCordModule = NestCordModule;
//# sourceMappingURL=nestcord.module.js.map