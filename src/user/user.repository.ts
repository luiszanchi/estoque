import { Inject, Injectable, Provider } from "@nestjs/common";
import { User } from "./user.model";
import { UserCreateDto } from "./user.dto";

export const userProvideRepository: string = 'USER_REPOSITORY';

export const userRepositoryProvider: Provider = {
    provide: userProvideRepository,
    useValue: User,
}