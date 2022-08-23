"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoggerMiddleware = void 0;
var common_1 = require("@nestjs/common");
var constants_1 = require("./../../constants");
var LoggerMiddleware = /** @class */ (function () {
    function LoggerMiddleware() {
    }
    LoggerMiddleware.prototype.use = function (req, res, next) {
        var code = "STATUS_CODE: ".concat(res.statusCode);
        var url = "PATH: ".concat(req.url);
        var query = JSON.stringify(req.query);
        var body = JSON.stringify(req.body);
        console.log("".concat(constants_1.CONSOLE_COLORS.BGcyan, "MIDDLE_WARE: ").concat(constants_1.CONSOLE_COLORS.reset).concat(constants_1.CONSOLE_COLORS.cyan), url, code, 'BODY: ', body, 'QUERY: ', query);
        next();
    };
    LoggerMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], LoggerMiddleware);
    return LoggerMiddleware;
}());
exports.LoggerMiddleware = LoggerMiddleware;
