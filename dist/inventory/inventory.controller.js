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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const create_inventory_dto_1 = require("./dto/create-inventory.dto");
const update_inventory_dto_1 = require("./dto/update-inventory.dto");
const inventory_service_1 = require("./inventory.service");
const jwt_guard_1 = require("../service/jwt.guard");
const winston_service_1 = require("../service/winston.service");
let InventoryController = exports.InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
        this.logger = (0, winston_service_1.default)('inventory', 'inventory.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleInventoryProcess(inventoryPromise, failureMessage, statusCode) {
        try {
            return await inventoryPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(req, createInventoryDto) {
        return this.handleInventoryProcess(this.inventoryService.create(createInventoryDto, req.user), 'Failed to create inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findOne(id, req) {
        return this.handleInventoryProcess(this.inventoryService.getInventoryById(id, req.user), 'Failed to get inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(req) {
        return this.handleInventoryProcess(this.inventoryService.findAll(req.user), 'Failed to get all inventories.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async update(id, req, updateInventoryDto) {
        return this.handleInventoryProcess(this.inventoryService.updateInventory(id, updateInventoryDto, req.user), 'Failed to update inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async delete(id, req) {
        return this.handleInventoryProcess(this.inventoryService.deleteInventory(id, req.user), 'Failed to delete inventory.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_inventory_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getAll'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_inventory_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "delete", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map