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
exports.EligibilityController = void 0;
const common_1 = require("@nestjs/common");
const create_eligibility_dto_1 = require("./dto/create-eligibility.dto");
const eligibility_service_1 = require("./eligibility.service");
const jwt_guard_1 = require("../service/jwt.guard");
let EligibilityController = exports.EligibilityController = class EligibilityController {
    constructor(eligibilityService) {
        this.eligibilityService = eligibilityService;
    }
    handleHttpException(error, message, status) {
        throw new common_1.HttpException(message || error.message, status);
    }
    async handleProcess(promise, failureMessage, statusCode) {
        try {
            return await promise;
        }
        catch (error) {
            this.handleHttpException(error, failureMessage, statusCode);
        }
    }
    async create({ user }, createEligibilityDto) {
        const createProcess = async () => await this.eligibilityService.create(createEligibilityDto, user);
        return await this.handleProcess(createProcess(), `eligibilityService create method failed with dto: ${JSON.stringify(createEligibilityDto)}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
__decorate([
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_eligibility_dto_1.CreateEligibilityDto]),
    __metadata("design:returntype", Promise)
], EligibilityController.prototype, "create", null);
exports.EligibilityController = EligibilityController = __decorate([
    (0, common_1.Controller)('eligibility'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __metadata("design:paramtypes", [eligibility_service_1.EligibilityService])
], EligibilityController);
//# sourceMappingURL=eligibility.controller.js.map