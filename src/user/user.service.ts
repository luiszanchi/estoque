import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "./user.model";
import * as bcrypt from 'bcrypt';
import { jwtConstants } from "../config/jwt.constants";

@Injectable()
export class UserService {
    public constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User,
        private jwtService: JwtService
    )
    {}

    public async createUser(input: object): Promise<User>
    {
        return await this.userRepository.create(input);
    }

    public async getAuthUserByEmailPassword(email: string, password: string): Promise<string>
    {
        const user: User = await this.userRepository.findOne({
            where: {
                email
            }
        });

        if (! user) {
            throw this.getException();
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (! isMatch) {
            throw this.getException();
        }
        
        return this.generateToken(user);
    }

    private getException(): UnauthorizedException
    {
        return new UnauthorizedException("Usuário ou Senha Inválidos");
    }

    private generateToken(user: User): string
    {
        return this.jwtService.sign(
            { 
                email: user.email
            },
            {
                secret: jwtConstants.secret,
                expiresIn: this.expiresIn(),
            },
        );
    }

    private expiresIn(): string
    {
        const days: number = parseInt(process.env.JWT_EXPIRES_IN_DAYS || '5')

        const hours: number = days * 24;
        return hours + 'h';
    }
}