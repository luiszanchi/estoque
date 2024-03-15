import { Provider } from "@nestjs/common";
import { Permission } from "./permission.model";

export const permissionProvideRepository: string = 'PERMISSION_REPOSITORY';

export const permissionRepository: Provider = {
    provide: permissionProvideRepository,
    useValue: Permission,
}