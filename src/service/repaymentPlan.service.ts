import { Injectable, BadRequestException } from '@nestjs/common';
import * as moment from 'moment';
import createLogger from './winston.service';

const PROFIT_FIRST = 'Profit First';
const PRINCIPAL_LAST = 'Principal Last';
const PART_PAYMENT = 'Part Payment of Principal and Profit';

export enum RepaymentChoice {
  PROFIT_FIRST_AND_CAPITAL_AT_THE_END = 'profit first and capital at the end',
  PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT = 'part payment of principal and profit',
}

@Injectable()
export class RepaymentService {
  private readonly logger = createLogger(
    'getFinancing-service',
    'getFinancing.error.log',
  );

  /**
   * @param {number} principal - The principal amount.
   * @param {string} userChoice - The user choice for repayment ("profit first and capital at the end" or "part payment of principal and profit").
   *
   * @returns {any} An object representing the repayment schedule.
   */
  calculateRepaymentByChoice(principal: number, userChoice: string): any {
    let profitPercent: number;

    // Adjust profit percentage based on the user choice
    switch (userChoice) {
      case RepaymentChoice.PROFIT_FIRST_AND_CAPITAL_AT_THE_END:
        profitPercent = 12;
        break;
      case RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT:
        profitPercent = 10;
        break;
      default:
        throw new BadRequestException(
          `Invalid user choice. Must be either "${RepaymentChoice.PROFIT_FIRST_AND_CAPITAL_AT_THE_END}" or "${RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT}".`,
        );
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
    } else if (
      userChoice === RepaymentChoice.PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT
    ) {
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
}
