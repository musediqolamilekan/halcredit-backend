export declare enum RepaymentChoice {
    PROFIT_FIRST_AND_CAPITAL_AT_THE_END = "profit first and capital at the end",
    PART_PAYMENT_OF_PRINCIPAL_AND_PROFIT = "part payment of principal and profit"
}
export declare class RepaymentService {
    private readonly logger;
    calculateRepaymentByChoice(principal: number, userChoice: string): any;
}
