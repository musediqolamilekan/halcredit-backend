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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inventory_schema_1 = require("./schemas/inventory.schema");
const winston_service_1 = require("../service/winston.service");
let InventoryService = exports.InventoryService = class InventoryService {
    constructor(inventoryModel) {
        this.inventoryModel = inventoryModel;
        this.logger = (0, winston_service_1.default)('inventory-service', 'inventory.error.log');
    }
    async create(createInventoryDto, user) {
        const createdInventory = new this.inventoryModel({
            ...createInventoryDto,
            user: user._id,
        });
        try {
            return await createdInventory.save();
        }
        catch (error) {
            this.logger.error(`Failed to create inventory: ${error.message}`);
            throw error;
        }
    }
    async getInventoryById(id, user) {
        try {
            return await this.inventoryModel.findOne({ _id: id, user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get inventory: ${error.message}`);
            throw error;
        }
    }
    async findAll(user) {
        try {
            return await this.inventoryModel.find({ user: user._id });
        }
        catch (error) {
            this.logger.error(`Failed to get inventory: ${error.message}`);
            throw error;
        }
    }
    async updateInventory(id, updateInventoryDto, user) {
        try {
            return await this.inventoryModel.findOneAndUpdate({ _id: id, user: user._id }, updateInventoryDto, { new: true });
        }
        catch (error) {
            this.logger.error(`Failed to update inventory: ${error.message}`);
            throw error;
        }
    }
    async deleteInventory(id, user) {
        try {
            return await this.inventoryModel.findOneAndRemove({
                _id: id,
                user: user._id,
            });
        }
        catch (error) {
            this.logger.error(`Failed to delete inventory: ${error.message}`);
            throw error;
        }
    }
};
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(inventory_schema_1.Inventory.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map