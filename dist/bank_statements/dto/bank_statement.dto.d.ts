export declare class CreateBankStatementDto {
    statement: string;
}
declare const UpdateBankStatementDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBankStatementDto>>;
export declare class UpdateBankStatementDto extends UpdateBankStatementDto_base {
}
export {};
