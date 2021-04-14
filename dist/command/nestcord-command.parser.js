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
exports.NestCordCommandParser = void 0;
var common_1 = require("@nestjs/common");
var core_1 = require("@nestjs/core");
var NestCordCommandParser = /** @class */ (function () {
    function NestCordCommandParser(ref) {
        this.ref = ref;
    }
    NestCordCommandParser.prototype.parse = function (message, meta, params) {
        var i = 0;
        var mapped = new Map();
        mapped.set('message', message);
        mapped.set('client', message.client);
        mapped.set('author', message.author);
        for (var _i = 0, _a = meta.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            var parser = this.ref.get(param.parser, { strict: false });
            var text = params[i];
            if (!text)
                if (param.optional)
                    continue;
                else
                    return null;
            var parsed = parser.parse(message, text);
            if (!parsed)
                if (param.optional)
                    continue;
                else
                    return null;
            mapped.set(param.descriptor, parsed);
            i++;
        }
        var result = [];
        for (var _b = 0, _c = meta.injector; _b < _c.length; _b++) {
            var inject = _c[_b];
            result[inject.index] = mapped.get(inject.descriptor);
        }
        return result;
    };
    NestCordCommandParser = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ModuleRef])
    ], NestCordCommandParser);
    return NestCordCommandParser;
}());
exports.NestCordCommandParser = NestCordCommandParser;
//# sourceMappingURL=nestcord-command.parser.js.map