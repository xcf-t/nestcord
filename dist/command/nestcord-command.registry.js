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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestCordCommandRegistry = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var constants_1 = require("../constants");
var NestCordCommandRegistry = /** @class */ (function () {
    function NestCordCommandRegistry(ref) {
        this.ref = ref;
        this.separator = '\u0000';
    }
    NestCordCommandRegistry_1 = NestCordCommandRegistry;
    NestCordCommandRegistry.prototype.getRegistry = function () {
        return NestCordCommandRegistry_1.registry;
    };
    NestCordCommandRegistry.prototype.register = function (path, executor) {
        var handler = this.ref.get(executor, { strict: false });
        var meta = {
            name: path,
            instance: handler,
            description: Reflect.getMetadata(constants_1.NESTCORD_DESCRIPTION, executor),
            injector: Reflect.getMetadata(constants_1.NESTCORD_INJECT, handler, 'execute'),
            parameters: Reflect.getMetadata(constants_1.NESTCORD_PARAM, executor),
        };
        NestCordCommandRegistry_1.registry.set(path.toLowerCase(), meta);
    };
    NestCordCommandRegistry.prototype.getCommand = function (path) {
        if (Array.isArray(path))
            path = path.join(this.separator);
        if (NestCordCommandRegistry_1.registry.has(path.toLowerCase()))
            return NestCordCommandRegistry_1.registry.get(path.toLowerCase());
        return null;
    };
    NestCordCommandRegistry.prototype.registerCommand = function (executor, paths) {
        if (paths === void 0) { paths = ['']; }
        var name = Reflect.getMetadata(constants_1.NESTCORD_COMMAND, executor);
        var aliases = Reflect.getMetadata(constants_1.NESTCORD_ALIAS, executor);
        var children = Reflect.getMetadata(constants_1.NESTCORD_CHILDREN, executor);
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            var appended = [path + this.separator + name.toLowerCase()];
            if (aliases)
                for (var _a = 0, aliases_1 = aliases; _a < aliases_1.length; _a++) {
                    var alias = aliases_1[_a];
                    appended.push(path + this.separator + alias.toLowerCase());
                }
            for (var _b = 0, appended_1 = appended; _b < appended_1.length; _b++) {
                var path_1 = appended_1[_b];
                this.register(path_1.substring(1), executor);
            }
            if (children)
                for (var _c = 0, children_1 = children; _c < children_1.length; _c++) {
                    var child = children_1[_c];
                    this.registerCommand(child, appended);
                }
        }
    };
    var NestCordCommandRegistry_1;
    NestCordCommandRegistry.registry = new Map();
    NestCordCommandRegistry = NestCordCommandRegistry_1 = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ModuleRef])
    ], NestCordCommandRegistry);
    return NestCordCommandRegistry;
}());
exports.NestCordCommandRegistry = NestCordCommandRegistry;
//# sourceMappingURL=nestcord-command.registry.js.map