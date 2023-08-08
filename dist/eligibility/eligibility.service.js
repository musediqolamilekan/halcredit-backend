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
exports.EligibilityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const eligibility_schema_1 = require("./schemas/eligibility.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const winston_service_1 = require("../service/winston.service");
const eligibility_strategy_1 = require("../service/eligibility.strategy");
let EligibilityService = exports.EligibilityService = class EligibilityService {
    constructor(eligibilityModel, userModel, eligibilityStrategy) {
        this.eligibilityModel = eligibilityModel;
        this.userModel = userModel;
        this.eligibilityStrategy = eligibilityStrategy;
        this.logger = (0, winston_service_1.default)('eligibility-service', 'eligibility.error.log');
    }
    async create(createEligibilityDto, user) {
        try {
            const isEligible = this.eligibilityStrategy.checkEligibility(createEligibilityDto.timeInBusiness, createEligibilityDto.monthlyIncome);
            const checkEligibility = new this.eligibilityModel({
                ...createEligibilityDto,
                user: user._id,
                isEligible: isEligible,
            });
            const savedEligibility = await checkEligibility.save();
            await this.userModel.updateOne({ _id: user._id }, { isEligible });
            const eligibilityStatus = isEligible ? 'Eligible' : 'Not Eligible';
            return { eligibilityStatus, eligibilityData: savedEligibility };
        }
        catch (error) {
            this.logger.error(`Failed to create eligibility: ${error.message}`);
            throw error;
        }
    }
};
exports.EligibilityService = EligibilityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(eligibility_schema_1.Eligibility.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        eligibility_strategy_1.EligibilityStrategy])
], EligibilityService);
//# sourceMappingURL=eligibility.service.js.map