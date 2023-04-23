// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return { data: newUser };
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const foundUser = await this.userService.findUserById(id);
    return { data: foundUser };
  }

  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    const foundUser = await this.userService.findUserByUsername(username);
    return { data: foundUser };
  }

  @Get()
  async findAllUsers() {
    const foundUsers = await this.userService.findAllUsers();
    return { data: foundUsers };
  }
}
