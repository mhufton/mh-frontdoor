import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.respository';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserController } from './user.controller';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        id: '',
        dateCreated: undefined,
        summary: [],
      };
      const user = { id: '1', ...createUserDto };
      jest.spyOn(userRepository, 'createUser').mockResolvedValue(user);
      expect(await userService.createUser(createUserDto)).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find a user by id', async () => {
      const id = '1';
      const user: User = {
        id: '123',
        username: 'testuser',
        password: 'password',
        dateCreated: new Date(),
        summary: [],
      };
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(user);
      expect(await userService.findUserById(id)).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const id = '1';
      jest.spyOn(userRepository, 'findUserById').mockResolvedValue(null);
      await expect(userService.findUserById(id)).rejects.toThrow(
        new NotFoundException(`User with id: ${id} not found`),
      );
    });
  });

  describe('findUserByUsername', () => {
    it('should throw NotFoundException when user is not found', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(userRepository, 'findUserByUsername').mockResolvedValue(null);

      expect(userService.findUserByUsername(username)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
