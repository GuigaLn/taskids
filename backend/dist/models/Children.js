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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Tasks_1 = __importDefault(require("./Tasks"));
/*
* OneToOne
* OneToMany
* ManyToMany
*/
var Child = /** @class */ (function () {
    function Child() {
    }
    Child_1 = Child;
    var Child_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Child.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Child.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Child.prototype, "currency", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Child.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Child.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Child.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Tasks_1.default; }, function (child) { return Child_1; }),
        __metadata("design:type", Array)
    ], Child.prototype, "tasks", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Child.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Child.prototype, "updated_at", void 0);
    Child = Child_1 = __decorate([
        typeorm_1.Entity('children')
    ], Child);
    return Child;
}());
exports.default = Child;
