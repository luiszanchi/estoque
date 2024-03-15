import { Provider } from "@nestjs/common";
import { UserPermission } from "./userPermission.model";

export const userPermissionsProvideRepository: string = 'USER_PERMISSIONS_REPOSITORY';

export const userPermissionsRepository: Provider = {
    provide: userPermissionsProvideRepository,
    useValue: UserPermission,
}