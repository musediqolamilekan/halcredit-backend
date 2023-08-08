import { GuarantorsService } from './guarantors.service';
import { CreateGuarantorDto } from './dto/create-guarantor.dto';
import { Guarantor } from './schemas/guarantors.schema';
import { SignUpDto } from './dto/signUp.dto';
import { CreateFormDto } from './dto/form.dto';
export declare class GuarantorsController {
    private readonly guarantorsService;
    private readonly logger;
    constructor(guarantorsService: GuarantorsService);
    private handleHttpException;
    private handleGuarantorProcess;
    create(req: any, createGuarantorDto: CreateGuarantorDto): Promise<any>;
    findAll(req: any): Promise<Guarantor[]>;
    signUp(signUpDto: SignUpDto): Promise<any>;
    createForm(files: any, req: any, createFormDto: CreateFormDto, guarantorToken: string): Promise<any>;
}
