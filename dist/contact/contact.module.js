"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactModule = void 0;
const common_1 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const contact_controller_1 = require("./contact.controller");
const mongoose_1 = require("@nestjs/mongoose");
const contact_schema_1 = require("./schemas/contact.schema");
const nest_winston_1 = require("nest-winston");
const auth_module_1 = require("../auth/auth.module");
const user_schema_1 = require("../user/schemas/user.schema");
let ContactModule = exports.ContactModule = class ContactModule {
};
exports.ContactModule = ContactModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Contact', schema: contact_schema_1.ContactSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            nest_winston_1.WinstonModule,
            auth_module_1.AuthModule,
        ],
        controllers: [contact_controller_1.ContactController],
        providers: [contact_service_1.ContactService],
    })
], ContactModule);
//# sourceMappingURL=contact.module.js.map