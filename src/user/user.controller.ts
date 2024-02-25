import { Body, Controller, Get, Request, Inject, Post, UseGuards, HttpCode, Res, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';

@Controller()
export class UserController {
  public constructor (
    private userService: UserService
  ){}

  @Post('/api/v1/login')
  async login(
    @Body() input: any,
    @Res() res: Response
  ): Promise<object> {
    const { email, password } = input
    return res
      .status(HttpStatus.OK)
      .json({
        token: await this.userService
          .getAuthUserByEmailPassword(email, password)
      })
  }

  @Get('/api/v1/user')
  @UseGuards(AuthGuard)
  public user(@Request() request): object {
    return request.user;
  }
}
