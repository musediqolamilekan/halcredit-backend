"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepaymentService = exports.RepaymentChoice = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const winston_service_1 = require("./winston.service");
const PROFIT_FIRST = 'Profit First';
const PRINCIPAL_LAST = 'Principal Last';
const PART_PAYMENT = 'Part Payment of Principal and Profit';
var RepaymentChoice;
(function (RepaymentChoice) {
    RepaymentChoice["PROFIT_FIRST_AND_CAPITAL_AT_THE_END"] = "profit first and capital at the end";
    RepaymentChoice["PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT"] = "part payment of principal and profit";
})(RepaymentChoice || (exports.RepaymentChoice = RepaymentChoice = {}));
let RepaymentService = exports.RepaymentService = class RepaymentService {
    constructor() {
        this.logger = (0, winston_service_1.default)('getFinancing-service', 'getFinancing.error.log');
    }
    calculateRepaymentByChoice(principal, userChoice) {
        let profitPercent;
        switch (userChoice) {
            case RepaymentChoice.PROFIT_FIRST_AND_CAPITAL_AT_THE_END:
                profitPercent = 12;
                break;
            case RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT:
                profitPercent = 10;
                break;
            default:
                throw new common_1.BadRequestException(`Invalid user choice. Must be either "${RepaymentChoice.PROFIT_FIRST_AND_CAPITAL_AT_THE_END}" or "${RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT}".`);
        }
        const profit = (profitPercent / 100) * principal;
        let repaymentSchedule = {};
        if (userChoice === RepaymentChoice.PROFIT_FIRST_AND_CAPITAL_AT_THE_END) {
            const profitHalf = profit / 2;
            repaymentSchedule = {
                phaseOne: {
                    payment: profitHalf,
                    description: PROFIT_FIRST,
                    dueDate: moment().add(10, 'days').toDate(),
                },
                phaseTwo: {
                    payment: profitHalf,
                    description: PROFIT_FIRST,
                    dueDate: moment().add(1, 'month').toDate(),
                },
                phaseThree: {
                    payment: principal,
                    description: PRINCIPAL_LAST,
                    dueDate: moment().add(2, 'months').toDate(),
                },
            };
        }
        else if (userChoice === RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT) {
            const profitHalf = profit / 2;
            const principalHalf = principal / 2;
            repaymentSchedule = {
                phaseOne: {
                    payment: profitHalf + principalHalf,
                    description: PART_PAYMENT,
                    dueDate: moment().add(1, 'month').toDate(),
                },
                phaseTwo: {
                    payment: profitHalf + principalHalf,
                    description: PART_PAYMENT,
                    dueDate: moment().add(2, 'months').toDate(),
                },
            };
        }
        this.logger.error('calculateRepaymentByChoice completed');
        return repaymentSchedule;
    }
};
exports.RepaymentService = RepaymentService = __decorate([
    (0, common_1.Injectable)()
], RepaymentService);
//# sourceMappingURL=repaymentPlan.service.js.map