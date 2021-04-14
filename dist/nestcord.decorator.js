"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCord = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./constants");
exports.NestCord = {
    Event: function (name) { return common_1.SetMetadata(constants_1.NESTCORD_EVENT, name); },
    Command: function () { return common_1.SetMetadata(constants_1.NESTCORD_COMMAND_REGISTER, true); },
    CommandName: function (name) { return common_1.SetMetadata(constants_1.NESTCORD_COMMAND, name); },
    Inject: function (descriptor) { return function (target, propertyKey, parameterIndex) {
        var meta = [];
        if (Reflect.hasMetadata(constants_1.NESTCORD_INJECT, target, propertyKey))
            meta = Reflect.getMetadata(constants_1.NESTCORD_INJECT, target, propertyKey);
        meta.push({
            index: parameterIndex,
            descriptor: descriptor,
        });
        Reflect.defineMetadata(constants_1.NESTCORD_INJECT, meta, target, propertyKey);
    }; },
    Alias: function () {
        var alias = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            alias[_i] = arguments[_i];
        }
        return common_1.SetMetadata(constants_1.NESTCORD_ALIAS, alias);
    },
    Children: function () {
        var children = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            children[_i] = arguments[_i];
        }
        return common_1.SetMetadata(constants_1.NESTCORD_CHILDREN, children);
    },
    Param: function (index, descriptor, parser, name, optional) {
        if (optional === void 0) { optional = false; }
        return function (target) {
            var meta = [];
            if (Reflect.hasMetadata(constants_1.NESTCORD_PARAM, target))
                meta = Reflect.getMetadata(constants_1.NESTCORD_PARAM, target);
            meta[index] = {
                descriptor: descriptor,
                parser: parser,
                optional: optional,
                name: name || descriptor,
            };
            Reflect.defineMetadata(constants_1.NESTCORD_PARAM, meta, target);
        };
    },
    Parser: function (name) { return common_1.SetMetadata(constants_1.NESTCORD_PARSER_NAME, name); },
};
//# sourceMappingURL=nestcord.decorator.js.map