export declare enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    phone?: string;
    email: string;
    password: string;
    businessName: string;
    industry: string;
    description: string;
    officeNumber: string;
    address?: string;
    profilePicture: any;
    state?: string;
    city?: string;
    bvn?: string;
    country?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    startedDate?: Date;
}
