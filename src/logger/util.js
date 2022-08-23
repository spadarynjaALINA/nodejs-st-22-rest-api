"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.customFormat = void 0;
var winston = require("winston");
var formatMeta = function (meta) {
    var splat = meta[Symbol["for"]('splat')];
    if (splat && splat.length) {
        return splat.length === 1 ? splat[0] : splat;
    }
    return splat;
};
exports.customFormat = winston.format.printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message, _b = _a.label, label = _b === void 0 ? '' : _b, meta = __rest(_a, ["timestamp", "level", "message", "label"]);
    return " ".concat(level, " [").concat(timestamp, "] PATH: ").concat(message, " METHOD:").concat(formatMeta(meta)[0], "  CODE: ").concat(formatMeta(meta)[1], " MESSAGE:").concat(formatMeta(meta)[2]);
});
