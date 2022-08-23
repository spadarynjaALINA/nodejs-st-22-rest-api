"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.AllExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var nest_winston_1 = require("nest-winston");
var AllExceptionsFilter = /** @class */ (function () {
    function AllExceptionsFilter(logger, httpAdapterHost) {
        this.logger = logger;
        this.httpAdapterHost = httpAdapterHost;
    }
    AllExceptionsFilter.prototype["catch"] = function (exception, host) {
        var httpAdapter = this.httpAdapterHost.httpAdapter;
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        var errorMessage = exception instanceof common_1.HttpException
            ? exception.message
            : 'Internal server error';
        var responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(request),
            message: errorMessage
        };
        this.logger.error(request.url, request.method, httpStatus, errorMessage);
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    };
    AllExceptionsFilter = __decorate([
        (0, common_1.Catch)(),
        __param(0, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_PROVIDER))
    ], AllExceptionsFilter);
    return AllExceptionsFilter;
}());
exports.AllExceptionsFilter = AllExceptionsFilter;
