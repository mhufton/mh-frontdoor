import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUserById(userQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userQuery).exec();
  }

  async findUserByUsername(userQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userQuery).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
