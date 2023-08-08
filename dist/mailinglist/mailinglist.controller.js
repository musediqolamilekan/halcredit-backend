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
exports.MailinglistController = void 0;
const common_1 = require("@nestjs/common");
const mailinglist_service_1 = require("./mailinglist.service");
const create_mailinglist_dto_1 = require("./dto/create-mailinglist.dto");
const update_mailinglist_dto_1 = require("./dto/update-mailinglist.dto");
let MailinglistController = exports.MailinglistController = class MailinglistController {
    constructor(mailinglistService) {
        this.mailinglistService = mailinglistService;
    }
    create(createMailinglistDto) {
        return this.mailinglistService.create(createMailinglistDto);
    }
    findAll() {
        return this.mailinglistService.findAll();
    }
    findOne(id) {
        return this.mailinglistService.findOne(+id);
    }
    update(id, updateMailinglistDto) {
        return this.mailinglistService.update(+id, updateMailinglistDto);
    }
    remove(id) {
        return this.mailinglistService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mailinglist_dto_1.CreateMailinglistDto]),
    __metadata("design:returntype", void 0)
], MailinglistController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MailinglistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MailinglistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_mailinglist_dto_1.UpdateMailinglistDto]),
    __metadata("design:returntype", void 0)
], MailinglistController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MailinglistController.prototype, "remove", null);
exports.MailinglistController = MailinglistController = __decorate([
    (0, common_1.Controller)('mailinglist'),
    __metadata("design:paramtypes", [mailinglist_service_1.MailinglistService])
], MailinglistController);
//# sourceMappingURL=mailinglist.controller.js.map