"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateParser = void 0;
var nestcord_decorator_1 = require("../nestcord.decorator");
var moment = require("moment");
require("moment-parseplus");
var DateParser = /** @class */ (function () {
    function DateParser() {
    }
    DateParser.prototype.parse = function (message, input) {
        moment.locale(message.author.locale || 'en');
        var date = moment(input, false);
        if (!date.isValid())
            return null;
        return date.toDate();
    };
    DateParser = __decorate([
        nestcord_decorator_1.NestCord.Parser('Date')
    ], DateParser);
    return DateParser;
}());
exports.DateParser = DateParser;
//# sourceMappingURL=date.parser.js.map