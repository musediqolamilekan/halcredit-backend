"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuarantorsModule = void 0;
const common_1 = require("@nestjs/common");
const guarantors_service_1 = require("./guarantors.service");
const guarantors_controller_1 = require("./guarantors.controller");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const guarantors_schema_1 = require("./schemas/guarantors.schema");
const signUp_schema_1 = require("./schemas/signUp.schema");
const file_service_1 = require("../service/file.service");
const form_schema_1 = require("./schemas/form.schema");
const email_service_1 = require("../service/email.service");
let GuarantorsModule = exports.GuarantorsModule = class GuarantorsModule {
};
exports.GuarantorsModule = GuarantorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Guarantor', schema: guarantors_schema_1.GuarantorSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
                { name: 'SignUp', schema: signUp_schema_1.SignUpSchema },
                { name: 'Form', schema: form_schema_1.FormSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [guarantors_controller_1.GuarantorsController],
        providers: [guarantors_service_1.GuarantorsService, file_service_1.FileService, email_service_1.EmailService],
        exports: [guarantors_service_1.GuarantorsService],
    })
], GuarantorsModule);
//# sourceMappingURL=guarantors.module.js.map