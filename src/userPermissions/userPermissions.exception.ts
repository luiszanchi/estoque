export class PermissionError extends Error {
    constructor(msg: string) {
        super(msg ? msg : "A Permission Error just ocurried");
    }
}

export class PermissionNotExistent extends PermissionError {
    constructor(permission: string) {
        super("The permission " + permission + " not exists!");
    }
}