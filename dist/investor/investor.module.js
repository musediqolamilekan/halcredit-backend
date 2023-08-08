"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestorModule = void 0;
const common_1 = require("@nestjs/common");
const investor_service_1 = require("./investor.service");
const investor_controller_1 = require("./investor.controller");
const investor_schema_1 = require("./schemas/investor.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
let InvestorModule = exports.InvestorModule = class InvestorModule {
};
exports.InvestorModule = InvestorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Investor', schema: investor_schema_1.InvestorSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [investor_controller_1.InvestorController],
        providers: [investor_service_1.InvestorService],
    })
], InvestorModule);
//# sourceMappingURL=investor.module.js.map