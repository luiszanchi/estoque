require('dotenv').config();

import { PermissionInterface } from "./userPermissions.interface";

import { castToBoolean } from '../helpers/castToBoolean'

export const adminPermission: PermissionInterface = {
    name: 'ADMIN',
    description: 'Administrador do Sistema',
    active: true
};

export const userPermission : PermissionInterface = {
    name: 'USER',
    description: 'Usuário Comum',
    active: true
};

export const stockistPermission : PermissionInterface = {
    name: 'STOCKIST',
    description: 'Estoquista',
    active: castToBoolean(process.env.PERMISSION_STOCKIST_ACTIVE)
}

export const stockCheckerPermission : PermissionInterface = {
    name: 'STOCKIST',
    description: 'Estoquista',
    active: castToBoolean(process.env.PERMISSION_STOCK_CHECKER_ACTIVE)
}

export const invoicerPermission : PermissionInterface = {
    name: 'INVOICER',
    description: 'Faturista',
    active: castToBoolean(process.env.PERMISSION_INVOICER_ACTIVE)
}

export const allPermissionsWithoutFilter: readonly PermissionInterface[] = [
    adminPermission,
    userPermission,
    stockistPermission,
    stockCheckerPermission,
    invoicerPermission,
];

export const allPermissionsWithDescription: readonly PermissionInterface[] = allPermissionsWithoutFilter.filter((permission: PermissionInterface) => permission.active);

export const allPermissions: readonly string[] = allPermissionsWithDescription.map((permission: PermissionInterface) => permission.name);
export const allPermissionsNameWithoutFilder: readonly string[] = allPermissionsWithDescription.map((permission: PermissionInterface) => permission.name);

export const permissionExist = (permission: string): boolean => allPermissions.includes(permission);