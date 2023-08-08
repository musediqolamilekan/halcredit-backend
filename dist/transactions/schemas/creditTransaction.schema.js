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
exports.CreditTransactionSchema = exports.CreditTransaction = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../user/schemas/user.schema");
let CreditTransaction = exports.CreditTransaction = class CreditTransaction {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: () => Date.now().toString() }),
    __metadata("design:type", String)
], CreditTransaction.prototype, "transactionTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => Math.floor(100000000 + Math.random() * 900000000) }),
    __metadata("design:type", Number)
], CreditTransaction.prototype, "referenceNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CreditTransaction.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['credit disbursed', 'credit paid'],
        required: true,
    }),
    __metadata("design:type", String)
], CreditTransaction.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], CreditTransaction.prototype, "user", void 0);
exports.CreditTransaction = CreditTransaction = __decorate([
    (0, mongoose_1.Schema)({ timestamps: { createdAt: 'transactionDate' } })
], CreditTransaction);
exports.CreditTransactionSchema = mongoose_1.SchemaFactory.createForClass(CreditTransaction);
//# sourceMappingURL=creditTransaction.schema.js.map