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
exports.StoreUserTransactionPinDto = void 0;
const class_validator_1 = require("class-validator");
class StoreUserTransactionPinDto {
}
exports.StoreUserTransactionPinDto = StoreUserTransactionPinDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6, { message: 'Pin must be exactly 6 digits' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Pin must contain only digits' }),
    __metadata("design:type", String)
], StoreUserTransactionPinDto.prototype, "pin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, 6, { message: 'Confirm pin must be exactly 6 digits' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Confirm pin must contain only digits' }),
    __metadata("design:type", String)
], StoreUserTransactionPinDto.prototype, "confirmPin", void 0);
//# sourceMappingURL=transaction-pin.dto.js.map