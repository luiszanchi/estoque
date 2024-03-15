import { Inject, Injectable } from "@nestjs/common";
import { companyProvideRepository } from "./company.repository";
import { Company } from "./company.model";
import { InputCreateCompanyInterface } from "./company.dto";
import { Cnpj } from "../valueObjects/cnpj.valueObject";
import { CompanyWithSameDocumentException } from "./company.exception";
import { UserPermissionsService } from "../userPermissions/userPermissions.service";
import { User } from "../user/user.model";
import { adminPermission } from "../userPermissions/userPermissions.const";
import { UserDontHavePermissionException } from "../userPermissions/userPermission.exception";

@Injectable()
export class CompanyService {
    constructor(
        @Inject(companyProvideRepository)
        private companyRepository: typeof Company,
        private userPermissionService: UserPermissionsService
    ) {}

    public async createCompany(user: User, input: InputCreateCompanyInterface): Promise<Company> {
        const userHasPermission: boolean = await this.userPermissionService.hasPermission(user, adminPermission.name);

        if (! userHasPermission) {
            throw new UserDontHavePermissionException(user, adminPermission.name);
        }

        const existCompanyWithSameDocument: boolean = await this.checkExistsCompanyByDocument(input.document);

        if (existCompanyWithSameDocument) {
            throw new CompanyWithSameDocumentException(input.document);
        }

        return this.companyRepository.create({
            name: input.name,
            document: input.document.value,
            user_id: user.id
        })
    }

    private async checkExistsCompanyByDocument(document: Cnpj): Promise<boolean> {
        return null != await this.companyRepository.findOne({
            where: {
                document: document.value
            }
        });
    }
}