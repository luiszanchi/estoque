import { Provider } from "@nestjs/common";
import { User } from "./user.model";

export const userRepository: Provider = {
    provide: 'USER_REPOSITORY',
    useValue: User,
}