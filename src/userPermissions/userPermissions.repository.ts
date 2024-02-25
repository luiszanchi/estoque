import { Provider } from "@nestjs/common";
import { UserPermission } from "./userPermission.model";

export const userPermissionsRepository: Provider = {
    provide: 'USER_PERMISSIONS_REPOSITORY',
    useValue: UserPermission,
}