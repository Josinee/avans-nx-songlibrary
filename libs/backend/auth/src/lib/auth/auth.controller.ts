import { Controller, Post, Logger, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/decorators';
import { IUserCredentials, IUserIdentity } from '@avans-nx-songlibrary/api';
import { CreateUserDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('Login');
        return await this.authService.login(credentials);
    }

    @Public()
    @Post('register')
    async register(@Body() user: CreateUserDto): Promise<IUserIdentity> {
        this.logger.log('Register');
        return await this.authService.register(user);
    }
}
