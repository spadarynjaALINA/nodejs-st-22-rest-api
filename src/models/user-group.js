"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserGroups = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var group_1 = require("./group");
var user_1 = require("./user");
var UserGroups = /** @class */ (function (_super) {
    __extends(UserGroups, _super);
    function UserGroups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.UUID,
            defaultValue: sequelize_typescript_1.DataType.UUIDV4,
            unique: true,
            primaryKey: true
        })
    ], UserGroups.prototype, "id");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return user_1.User; }),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.UUID
        })
    ], UserGroups.prototype, "userId");
    __decorate([
        (0, sequelize_typescript_1.ForeignKey)(function () { return group_1.Group; }),
        (0, sequelize_typescript_1.Column)({
            type: sequelize_typescript_1.DataType.UUID
        })
    ], UserGroups.prototype, "groupId");
    UserGroups = __decorate([
        (0, sequelize_typescript_1.Table)({ tableName: 'userGroups' })
    ], UserGroups);
    return UserGroups;
}(sequelize_typescript_1.Model));
exports.UserGroups = UserGroups;
