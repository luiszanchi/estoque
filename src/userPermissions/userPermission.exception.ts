import { User } from "../user/user.model";

export class UserDontHavePermissionException extends Error {
    constructor(user: User, permission: string) {
        super("The user " + user.id + " don't have the permission '" + permission + "'");
    }
}