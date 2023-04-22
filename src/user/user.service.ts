import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.respository';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const userToCreate = await this.userRepository.createUser(user);
    return userToCreate;
  }

  async findUserById(id: string): Promise<User> {
    const foundUser = await this.userRepository.findUserById({ id });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }

    return foundUser;
  }

  async findUserByUsername(username: string): Promise<User> {
    // eslint-disable-next-line prettier/prettier
    const foundUser = await this.userRepository.findUserByUsername({ username });

    if (!foundUser) {
      throw new NotFoundException(`User with id: ${username} not found`);
    }

    return foundUser;
  }

  async findAllUsers(): Promise<User[]> {
    const foundUsers = await this.userRepository.findAll();
    return foundUsers;
  }
}
