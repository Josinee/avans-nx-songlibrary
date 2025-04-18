import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUserInfo, IUser } from '@avans-nx-songlibrary/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-songlibrary/backend/dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<IUserInfo[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUser | null> {
        return this.userService.findOne(id);
    }

    @Post('')
    create(@Body() user: CreateUserDto): Promise<IUserInfo> {
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<IUserInfo | null> {
        return this.userService.update(id, user);
    }
}
