"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsModule = void 0;
const common_1 = require("@nestjs/common");
const contracts_service_1 = require("./contracts.service");
const contracts_controller_1 = require("./contracts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const contracts_schema_1 = require("./schemas/contracts.schema");
const auth_module_1 = require("../auth/auth.module");
const user_schema_1 = require("../user/schemas/user.schema");
const file_service_1 = require("../service/file.service");
let ContractsModule = exports.ContractsModule = class ContractsModule {
};
exports.ContractsModule = ContractsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Contracts', schema: contracts_schema_1.ContractsSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [contracts_controller_1.ContractsController],
        providers: [contracts_service_1.ContractsService, file_service_1.FileService],
    })
], ContractsModule);
//# sourceMappingURL=contracts.module.js.map