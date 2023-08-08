"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFinancingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("../auth/auth.module");
const get_financing_service_1 = require("./get_financing.service");
const get_financing_controller_1 = require("./get_financing.controller");
const invoice_schema_1 = require("./schemas/invoice.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const file_service_1 = require("../service/file.service");
const ipa_schema_1 = require("./schemas/ipa.schema");
const repaymentPlan_service_1 = require("../service/repaymentPlan.service");
let GetFinancingModule = exports.GetFinancingModule = class GetFinancingModule {
};
exports.GetFinancingModule = GetFinancingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'FinancingInvoice', schema: invoice_schema_1.FinancingInvoiceSchema },
                { name: 'IPA', schema: ipa_schema_1.IPASchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [get_financing_controller_1.GetFinancingController],
        providers: [get_financing_service_1.GetFinancingService, file_service_1.FileService, repaymentPlan_service_1.RepaymentService],
    })
], GetFinancingModule);
//# sourceMappingURL=get_financing.module.js.map