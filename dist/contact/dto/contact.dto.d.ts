export declare class CreateContactDto {
    topic: string;
    message: string;
}
declare const UpdateContactDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContactDto>>;
export declare class UpdateContactDto extends UpdateContactDto_base {
}
export {};
