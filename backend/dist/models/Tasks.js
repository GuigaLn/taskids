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
var Children_1 = __importDefault(require("./Children"));
/*
* OneToOne
* OneToMany
* ManyToMany
*/
var Task = /** @class */ (function () {
    function Task() {
    }
    Task_1 = Task;
    var Task_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('increment'),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Task.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Task.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Task.prototype, "amount", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Task.prototype, "answer", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Task.prototype, "answer_text", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Task.prototype, "realized", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Task.prototype, "child_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Children_1.default; }, function (tasks) { return Task_1; }, { eager: true }),
        typeorm_1.JoinColumn({ name: 'child_id' }),
        __metadata("design:type", Children_1.default)
    ], Task.prototype, "child", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Task.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Task.prototype, "updated_at", void 0);
    Task = Task_1 = __decorate([
        typeorm_1.Entity('tasks')
    ], Task);
    return Task;
}());
exports.default = Task;
