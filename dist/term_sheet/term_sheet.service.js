"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermSheetService = void 0;
const common_1 = require("@nestjs/common");
let TermSheetService = exports.TermSheetService = class TermSheetService {
    create(createTermSheetDto) {
        return 'This action adds a new termSheet';
    }
    findAll() {
        return `This action returns all termSheet`;
    }
    findOne(id) {
        return `This action returns a #${id} termSheet`;
    }
    update(id, updateTermSheetDto) {
        return `This action updates a #${id} termSheet`;
    }
    remove(id) {
        return `This action removes a #${id} termSheet`;
    }
};
exports.TermSheetService = TermSheetService = __decorate([
    (0, common_1.Injectable)()
], TermSheetService);
//# sourceMappingURL=term_sheet.service.js.map