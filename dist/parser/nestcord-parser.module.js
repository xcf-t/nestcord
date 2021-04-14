"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCordParserModule = void 0;
var common_1 = require("@nestjs/common");
var channel_parser_1 = require("./channel.parser");
var member_parser_1 = require("./member.parser");
var number_parser_1 = require("./number.parser");
var string_parser_1 = require("./string.parser");
var user_parser_1 = require("./user.parser");
var NestCordParserModule = /** @class */ (function () {
    function NestCordParserModule() {
    }
    NestCordParserModule = __decorate([
        common_1.Module({
            providers: [
                channel_parser_1.ChannelParser,
                member_parser_1.MemberParser,
                number_parser_1.NumberParser,
                string_parser_1.StringParser,
                user_parser_1.UserParser,
            ],
            exports: [
                channel_parser_1.ChannelParser,
                member_parser_1.MemberParser,
                number_parser_1.NumberParser,
                string_parser_1.StringParser,
                user_parser_1.UserParser,
            ],
        })
    ], NestCordParserModule);
    return NestCordParserModule;
}());
exports.NestCordParserModule = NestCordParserModule;
//# sourceMappingURL=nestcord-parser.module.js.map