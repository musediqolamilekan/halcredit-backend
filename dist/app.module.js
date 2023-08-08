"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mailinglist_module_1 = require("./mailinglist/mailinglist.module");
const database_module_1 = require("./database/database.module");
const profile_module_1 = require("./profile/profile.module");
const staff_module_1 = require("./staff/staff.module");
const directors_module_1 = require("./directors/directors.module");
const company_module_1 = require("./company/company.module");
const bank_statements_module_1 = require("./bank_statements/bank_statements.module");
const transactions_module_1 = require("./transactions/transactions.module");
const guarantors_module_1 = require("./guarantors/guarantors.module");
const invoices_module_1 = require("./invoices/invoices.module");
const term_sheet_module_1 = require("./term_sheet/term_sheet.module");
const contracts_module_1 = require("./contracts/contracts.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const customers_module_1 = require("./customers/customers.module");
const inventory_module_1 = require("./inventory/inventory.module");
const contact_module_1 = require("./contact/contact.module");
const documents_module_1 = require("./documents/documents.module");
const investor_module_1 = require("./investor/investor.module");
const eligibility_module_1 = require("./eligibility/eligibility.module");
const get_financing_module_1 = require("./get_financing/get_financing.module");
const notification_module_1 = require("./notification/notification.module");
const application_module_1 = require("./application/application.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            mailinglist_module_1.MailinglistModule,
            database_module_1.DatabaseModule,
            profile_module_1.ProfileModule,
            staff_module_1.StaffModule,
            directors_module_1.DirectorsModule,
            company_module_1.CompanyModule,
            bank_statements_module_1.BankStatementsModule,
            transactions_module_1.TransactionsModule,
            guarantors_module_1.GuarantorsModule,
            invoices_module_1.InvoicesModule,
            term_sheet_module_1.TermSheetModule,
            contracts_module_1.ContractsModule,
            suppliers_module_1.SuplliersModule,
            customers_module_1.CustomersModule,
            inventory_module_1.InventoryModule,
            contact_module_1.ContactModule,
            documents_module_1.DocumentsModule,
            investor_module_1.InvestorModule,
            eligibility_module_1.EligibilityModule,
            get_financing_module_1.GetFinancingModule,
            notification_module_1.NotificationModule,
            application_module_1.ApplicationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map