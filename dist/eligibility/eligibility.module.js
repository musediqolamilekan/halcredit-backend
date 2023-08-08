"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EligibilityModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const user_schema_1 = require("../user/schemas/user.schema");
const eligibility_service_1 = require("./eligibility.service");
const eligibility_controller_1 = require("./eligibility.controller");
const eligibility_schema_1 = require("./schemas/eligibility.schema");
const eligibility_strategy_1 = require("../service/eligibility.strategy");
let EligibilityModule = exports.EligibilityModule = class EligibilityModule {
};
exports.EligibilityModule = EligibilityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Eligibility', schema: eligibility_schema_1.EligibilitySchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [eligibility_controller_1.EligibilityController],
        providers: [eligibility_service_1.EligibilityService, eligibility_strategy_1.EligibilityStrategy],
    })
], EligibilityModule);
//# sourceMappingURL=eligibility.module.js.map