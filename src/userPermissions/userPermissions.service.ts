import { Inject, Injectable } from "@nestjs/common";
import { UserPermission } from "./userPermission.model";
import { User } from "../user/user.model";
import { allPermissions } from "./userPermissions.const";
import { PermissionNotExistent } from "./userPermissions.exception";

@Injectable()
export class UserPermissionsService {
    private allPermissions: readonly string[];

    public constructor (
        @Inject('USER_PERMISSIONS_REPOSITORY')
        private userPermissionsRepository: typeof UserPermission,
        
    ) {
        this.allPermissions = allPermissions;
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
        permissions.forEach((permission: string) => this.validatePermission(permission));
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

    public async create (user: User, permission: string, validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermission(permission);
        }

        await this.userPermissionsRepository.create({
            user_id: user.id,
            permission
        });
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

    public async delete(user: User, permission: string, validate: boolean = true): Promise<void> {
        if (validate) {
            this.validatePermission(permission);
        }

        await this.userPermissionsRepository.destroy({
            where: {
                user_id: user.id,
                permission
            }
        });
    }

    public async getAllUserPermissions(user: User): Promise<UserPermission[]> {
        return await this.userPermissionsRepository.findAll({
            where: {
                user_id: user.id
            }
        });
    }

    public async getAllPermissions(user: User): Promise<string[]> {
        const userPermissions: UserPermission[] = await this.getAllUserPermissions(user);

        return userPermissions.map((userPermission: UserPermission) => userPermission.permission);
    }

    public async hasPermission(user: User, permission: string): Promise<boolean> {
        const userPermissions: UserPermission[] = await this.userPermissionsRepository.findAll({
            where: {
                user_id: user.id,
                permission
            }
        });

        return userPermissions.length == 1;
    }
}