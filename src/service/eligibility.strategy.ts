import { Injectable } from '@nestjs/common';

@Injectable()
export class EligibilityStrategy {
  /**
   * Checks the eligibility of a business based on the time in business,
   * monthly income, and amount expected.
   *
   * @param {number} timeInBusiness - The number of years the business has been operational.
   * @param {number} monthlyIncome - The monthly income of the business.
   *
   * @returns {boolean} - Returns true if the business is eligible, false otherwise.
   */
  checkEligibility(timeInBusiness: number, monthlyIncome: number): boolean {
    if (timeInBusiness < 2) {
      return monthlyIncome >= 1.667;
    }
    return (
      monthlyIncome >= 1.667 ||
      (timeInBusiness >= 2 && timeInBusiness <= 4 && monthlyIncome < 1.667)
    );
  }
}
