import { Inject } from "@nestjs/common";
import { companyStorageProvideRepository } from "./companyStorage.repository";
import { CompanyStorage } from "./companyStorage.model";
import { Company } from "../company/company.model";
import { CompanyStorageExistentException, CompanyStorageNotExistentException } from "./companyStorage.exception";
import { User } from "../user/user.model";
import { UserPermissionsService } from "../userPermissions/userPermissions.service";
import { adminPermission } from "../userPermissions/userPermissions.const";
import { UserDontHavePermissionException } from "../userPermissions/userPermission.exception";

export class CompanyStorageService {
    constructor(
        @Inject(companyStorageProvideRepository)
        private companyStorageRepository: typeof CompanyStorage,
        private userPermissionService: UserPermissionsService
    ) {}

    private async validatePermission(
        user: User,
        company: Company|null = null
    ): Promise<void> {
        if (company && user.id == company.user_id) {
            return;
        }

        const hasPermission = await this.userPermissionService.hasPermission(user, adminPermission.name);

        if (hasPermission) {
            return;
        }

        throw new UserDontHavePermissionException(user, adminPermission.name);
    }

    public async create(
        user: User,
        company: Company,
        name: string
    ): Promise<CompanyStorage> {
        await this.validatePermission(user, company);

        const companyStorageExistent = this.companyStorageRepository.findOne({
            where: {
                company_id: company.id,
                name
            }
        });

        if (companyStorageExistent) {
            throw new CompanyStorageExistentException(company, name);
        }

        return await this.companyStorageRepository.create({
            company_id: company.id,
            name
        })
    }

    public async update(
        user: User,
        id: number,
        name: string
    ): Promise<CompanyStorage> {
        const companyStorage = await this.companyStorageRepository.findOne({
            where: {
                id
            }
        });

        await this.validatePermission(user, companyStorage.company);

        if (! companyStorage) {
            throw new CompanyStorageNotExistentException(id)
        }

        const companyStorageWithSameName = await this.companyStorageRepository.findOne({
            where: {
                company_id: companyStorage.company_id,
                id: {
                    $not: id
                },
                name
            }
        })

        if (companyStorageWithSameName) {
            throw new CompanyStorageExistentException(companyStorageWithSameName.company, name);
        }

        return await companyStorage.update({
            name
        })
    }

    public async delete(
        user: User,
        id: number
    ): Promise<void>
    {
        await this.companyStorageRepository.destroy({
            where: {
                id
            }
        });
    }


}