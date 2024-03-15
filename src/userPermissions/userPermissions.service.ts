import { Inject, Injectable } from "@nestjs/common";
import { UserPermission } from "./userPermission.model";
import { User } from "../user/user.model";
import { allPermissions, allPermissionsWithoutFilter } from "./userPermissions.const";
import { PermissionNotExistent } from "./userPermissions.exception";
import { userPermissionsProvideRepository } from "./userPermissions.repository";
import { Permission } from "../permissions/permission.model";
import { permissionProvideRepository } from "../permissions/permission.repository";
import { PermissionInterface } from "./userPermissions.interface";

@Injectable()
export class UserPermissionsService {
    private allPermissions: readonly string[];

    public constructor (
        @Inject(userPermissionsProvideRepository)
        private userPermissionsRepository: typeof UserPermission,
        @Inject(permissionProvideRepository)
        private permissionRepository: typeof Permission
        
    ) {
        this.allPermissions = allPermissions;
    }

    public async asyncPermissions(): Promise<void>
    {
        allPermissionsWithoutFilter.forEach(async (permissionToSync: PermissionInterface) => {
            const permissionExist: Permission = await this.permissionRepository.findOne({ where: { name: permissionToSync.name }});

            if (permissionExist) {
                await permissionExist.update({
                    description: permissionToSync.description,
                    active: permissionToSync.active 
                });
                return;
            }

            await this.permissionRepository.create(permissionToSync);
        })
    }

    private async getPermissionByName(name: string): Promise<Permission>
    {
        return await this.permissionRepository.findOne({
            where: {
                name
            }
        });
    }

    public permissionIsValid(permission: string): boolean
    {
        return this.allPermissions.includes(permission);
    }

    private validatePermission(permission: string): void
    {
        if (this.permissionIsValid(permission)) {
            return;
        }

        throw new PermissionNotExistent(permission);
    }

    private validatePermissions(permissions: string[]): void
    {
        for (let i = 0; i < permissions.length; i++ ) {
            const permission: string = permissions[i];
            this.validatePermission(permission);
        }
    }

    public async syncPermissions(user: User, permissions: string[]): Promise<void> {
        this.validatePermissions(permissions);

        const allUserPermissions: string[] = await this.getAllPermissions(user);

        const permissionsToAdd: string[] = permissions.filter((permission: string) => {
            return ! allUserPermissions.includes(permission);
        });

        const permissionsToDel: string[] = allUserPermissions.filter((permission: string) => {
            return ! permissions.includes(permission);
        });

        await Promise.all([
            this.deleteMany(user, permissionsToDel, false),
            this.createMany(user, permissionsToAdd, false),
        ])
    }

    public async createMany (user: User, permissions: string[], validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermissions(permissions);
        }

        await Promise.all(
            permissions.map((permission) => {
                return this.create(user, permission, validate);
            })
        );
    }

    public async create (user: User, permissionName: string, validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermission(permissionName);
        }

        try {
            const permission = await this.getPermissionByName(permissionName);

            await this.userPermissionsRepository.create({
                user_id: user.id,
                permission_id: permission.id
            });
        } catch (e) {
            console.log('erro criacao permission', e);
            throw e;
        }
    }

    public async deleteMany (user: User, permissions: string[], validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermissions(permissions);
        }

        await Promise.all(
            permissions.map((permission) => {
                return this.delete(user, permission, validate);
            })
        );
    }

    public async delete(user: User, permissionName: string, validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermission(permissionName);
        }
        
        const permission = await this.getPermissionByName(permissionName);

        await this.userPermissionsRepository.destroy({
            where: {
                user_id: user.id,
                permission_id: permission.id
            }
        });
    }

    public async getAllUserPermissions(user: User): Promise<UserPermission[]> {
        return await this.userPermissionsRepository.findAll({
            where: {
                user_id: user.id
            },
            include: [
                'permission'
            ]
        });
    }

    public async getAllPermissions(user: User): Promise<string[]> {
        const userPermissions: UserPermission[] = await this.getAllUserPermissions(user);

        return userPermissions.map((userPermission: UserPermission) => {
            console.log('userPermission.permission.name', userPermission, userPermission.permission)
            return userPermission.permission.name
        });
    }

    public async hasPermission(user: User, permissionName: string): Promise<boolean> {
        const permission = await this.getPermissionByName(permissionName);

        return null != await this.userPermissionsRepository.findOne({
            where: {
                user_id: user.id,
                permission_id: permission.id
            }
        });
    }
}