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
exports.DirectorController = void 0;
const common_1 = require("@nestjs/common");
const create_director_dto_1 = require("./dto/create-director.dto");
const update_director_dto_1 = require("./dto/update-director.dto");
const directors_service_1 = require("./directors.service");
const jwt_guard_1 = require("../service/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const winston_service_1 = require("../service/winston.service");
let DirectorController = exports.DirectorController = class DirectorController {
    constructor(directorService) {
        this.directorService = directorService;
        this.logger = (0, winston_service_1.default)('directors', 'directors.error.log');
    }
    handleHttpException(error, message, statusCode) {
        this.logger.error(message, error);
        throw new common_1.HttpException(message || error.message, statusCode);
    }
    async handleDirectorProcess(directorPromise, failureMessage, statusCode) {
        try {
            return await directorPromise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create(files, req, createDirectorDto) {
        const photo = files.photo ? files.photo[0] : null;
        return this.handleDirectorProcess(this.directorService.create(createDirectorDto, req.user, photo), 'Failed to create director.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(req) {
        return this.handleDirectorProcess(this.directorService.findAll(req.user), 'Failed to get all directors.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findOne(id, req) {
        return this.handleDirectorProcess(this.directorService.getDirectorById(id, req.user), 'Failed to get director.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async update(id, req, updateDirectorDto) {
        return this.handleDirectorProcess(this.directorService.updateDirector(id, updateDirectorDto, req.user), 'Failed to update director.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async delete(id, req) {
        return this.handleDirectorProcess(this.directorService.deleteDirector(id, req.user), 'Failed to delete director.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'photo', maxCount: 1 }])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_director_dto_1.CreateDirectorDto]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_director_dto_1.UpdateDirectorDto]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DirectorController.prototype, "delete", null);
exports.DirectorController = DirectorController = __decorate([
    (0, common_1.Controller)('directors'),
    __metadata("design:paramtypes", [directors_service_1.DirectorService])
], DirectorController);
//# sourceMappingURL=directors.controller.js.map