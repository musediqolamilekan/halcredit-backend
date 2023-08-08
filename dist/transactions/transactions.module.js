"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_controller_1 = require("./transactions.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bankTransfer_schema_1 = require("./schemas/bankTransfer.schema");
const billsPayments_schema_1 = require("./schemas/billsPayments.schema");
const newCard_schema_1 = require("./schemas/newCard.schema");
const sendFunds_schema_1 = require("./schemas/sendFunds.schema");
const creditTransaction_schema_1 = require("./schemas/creditTransaction.schema");
const creditTransaction_controller_1 = require("./controllers/creditTransaction.controller");
const creditTransaction_service_1 = require("./services/creditTransaction.service");
const auth_module_1 = require("../auth/auth.module");
const user_schema_1 = require("../user/schemas/user.schema");
let TransactionsModule = exports.TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'BankTransfer', schema: bankTransfer_schema_1.BankTransferSchema },
                { name: 'BillsPayments', schema: billsPayments_schema_1.BillsPaymentsSchema },
                { name: 'NewCard', schema: newCard_schema_1.NewCardSchema },
                { name: 'SendFunds', schema: sendFunds_schema_1.SendFundsSchema },
                { name: 'CreditTransaction', schema: creditTransaction_schema_1.CreditTransactionSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [transactions_controller_1.TransactionsController, creditTransaction_controller_1.CreditTransactionController],
        providers: [transactions_service_1.TransactionsService, creditTransaction_service_1.CreditTransactionService],
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map