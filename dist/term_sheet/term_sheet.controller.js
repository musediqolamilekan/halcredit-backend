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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermSheetController = void 0;
const common_1 = require("@nestjs/common");
const term_sheet_service_1 = require("./term_sheet.service");
const create_term_sheet_dto_1 = require("./dto/create-term_sheet.dto");
const update_term_sheet_dto_1 = require("./dto/update-term_sheet.dto");
let TermSheetController = exports.TermSheetController = class TermSheetController {
    constructor(termSheetService) {
        this.termSheetService = termSheetService;
    }
    create(createTermSheetDto) {
        return this.termSheetService.create(createTermSheetDto);
    }
    findAll() {
        return this.termSheetService.findAll();
    }
    findOne(id) {
        return this.termSheetService.findOne(+id);
    }
    update(id, updateTermSheetDto) {
        return this.termSheetService.update(+id, updateTermSheetDto);
    }
    remove(id) {
        return this.termSheetService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_term_sheet_dto_1.CreateTermSheetDto]),
    __metadata("design:returntype", void 0)
], TermSheetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TermSheetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TermSheetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_term_sheet_dto_1.UpdateTermSheetDto]),
    __metadata("design:returntype", void 0)
], TermSheetController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TermSheetController.prototype, "remove", null);
exports.TermSheetController = TermSheetController = __decorate([
    (0, common_1.Controller)('term-sheet'),
    __metadata("design:paramtypes", [term_sheet_service_1.TermSheetService])
], TermSheetController);
//# sourceMappingURL=term_sheet.controller.js.map