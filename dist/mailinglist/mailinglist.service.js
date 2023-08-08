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
exports.MailinglistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mailinglist_schema_1 = require("./schemas/mailinglist.schema");
const mongoose = require("mongoose");
let MailinglistService = exports.MailinglistService = class MailinglistService {
    constructor(mailingListModel) {
        this.mailingListModel = mailingListModel;
    }
    create(createMailinglistDto) {
        return 'This action adds a new mailinglist';
    }
    async findAll() {
        const mailinglist = await this.mailingListModel.find();
        return mailinglist;
    }
    findOne(id) {
        return `This action returns a #${id} mailinglist`;
    }
    update(id, updateMailinglistDto) {
        return `This action updates a #${id} mailinglist`;
    }
    remove(id) {
        return `This action removes a #${id} mailinglist`;
    }
};
exports.MailinglistService = MailinglistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(mailinglist_schema_1.MailingList.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], MailinglistService);
//# sourceMappingURL=mailinglist.service.js.map