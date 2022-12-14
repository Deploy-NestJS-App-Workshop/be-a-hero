import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUserFilterDto } from './dtos/get-user-filter.dto';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public getUsers(filterDto: GetUserFilterDto): Promise<User[]> {
    return this.usersRepository.getUsers(filterDto);
  }

  public async getUserById(id: string): Promise<User> {
    const found = await this.usersRepository.getById(id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  public createUser(userInfo: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(userInfo);
  }

  public async deleteUserById(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  public async putUserById(id: string, userInfo: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    return this.usersRepository.save({ ...user, ...userInfo });
  }

  // private users: User[] = [
  //   {
  //     id: v4(),
  //     name: 'Vic',
  //     age: 30,
  //     role: USER_ROLE.TEACHER,
  //     active: true,
  //   },
  //   {
  //     id: v4(),
  //     name: 'Vic 2',
  //     age: 13,
  //     role: USER_ROLE.STUDENT,
  //     active: true,
  //   },
  // ];

  // public getAllUsers(): User[] {
  //   return this.users;
  // }

  // public getUsersWithTasks(filterDto: GetUserFilterDto): User[] {
  //   const { name, search } = filterDto;
  //   let users = [...this.users];
  //
  //   if (name) {
  //     users = users.filter((user) => user.name === name);
  //   }
  //
  //   if (search) {
  //     users = users.filter((user) => {
  //       if (user.name.includes(search)) {
  //         return true;
  //       }
  //
  //       return false;
  //     });
  //   }
  //
  //   return users;
  // }

  // public getUserById(id: string): User {
  //   const foundUser = this.users.find((user) => user.id === id);
  //
  //   if (!foundUser) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }
  //
  //   return foundUser;
  // }

  // public deleteUserById(id: string): void {
  //   const userFound = this.getUserById(id);
  //
  //   this.users = this.users.filter((user) => user.id !== userFound.id);
  // }

  // public putUserById(id: string, userInfo: UpdateUserDto): User {
  //   const userIndex = this.users.findIndex((user) => user.id === id);
  //   this.users[userIndex] = { ...this.users[userIndex], ...userInfo };
  //
  //   return this.users[userIndex];
  // }

  // public createUser(userInfo: CreateUserDto): User {
  //   const user = {
  //     id: v4(),
  //     ...userInfo,
  //   };
  //   this.users.push(user);
  //
  //   return user;
  // }
}
