/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { User } from './../../models/user';
import { LoginUserDto } from './../../dto/login.dto';
import { CreateUserDto } from './../../dto/create-user.dto';
import { UpdateUserDto } from './../../dto/update-user.dto';
describe('UsersController', () => {
  let usersController: UsersController;
  let userService: UsersService;

  const mockUser = {
    id: 'f79a94dd-21f3-4b70-b904-05b7afe3f71y',
    login: 'JackyChan',
    age: 45,
    password: 'abc1234',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const query = {
    loginSubstring: 'Jacky',
    limit: 5,
  };

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        getAutoSuggestUsers: jest.fn(() => []),
        findOne: jest.fn(() => mockUser),
        create: jest.fn(() => {}),
        login: jest.fn(() => ''),
        remove: jest.fn(() => {}),
        update: jest.fn(() => {}),
        models: { User },
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, ApiServiceProvider],
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });
  it('calling getAllUsers method', async () => {
    await usersController.getAutoSuggestUsers(query);
    expect(userService.getAutoSuggestUsers).toHaveBeenCalled();
  });
  it('calling findOne method', async () => {
    await usersController.findOne('5e75fb2a-8202-4891-9880-d875bdaff76e');
    expect(userService.findOne).toHaveBeenCalled();
    expect(userService.findOne).toHaveBeenCalledWith(
      '5e75fb2a-8202-4891-9880-d875bdaff76e',
    );
  });
  it('calling update method', async () => {
    const dto = new UpdateUserDto();
    await usersController.update(dto);
    expect(userService.update).toHaveBeenCalled();
    expect(userService.update).toHaveBeenCalledWith(dto);
  });

  it('calling create method', async () => {
    const dto = new CreateUserDto();
    await usersController.create(dto);
    expect(userService.create).toHaveBeenCalled();
    expect(userService.create).toHaveBeenCalledWith(dto);
    expect(userService.create).not.toEqual(null);
  });
  it('calling remove method', async () => {
    await usersController.remove('5e75fb2a-8202-4891-9880-d875bdaff76e');
    expect(userService.remove).toHaveBeenCalled();
  });

  it('calling addUsersToGroup method', async () => {
    const dto = new LoginUserDto();
    await usersController.login(dto);
    expect(userService.login).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalledWith(dto);
  });
});
