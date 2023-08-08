"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectorsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const directors_service_1 = require("./directors.service");
const directors_controller_1 = require("./directors.controller");
const directors_schema_1 = require("./schemas/directors.schema");
const auth_module_1 = require("../auth/auth.module");
const file_service_1 = require("../service/file.service");
let DirectorsModule = exports.DirectorsModule = class DirectorsModule {
};
exports.DirectorsModule = DirectorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Directors', schema: directors_schema_1.DirectorsSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [directors_controller_1.DirectorController],
        providers: [directors_service_1.DirectorService, file_service_1.FileService],
    })
], DirectorsModule);
//# sourceMappingURL=directors.module.js.map