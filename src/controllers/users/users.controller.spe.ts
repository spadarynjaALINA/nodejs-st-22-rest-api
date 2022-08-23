import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../services/users/users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategies/jwt.strategy';

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
describe('UserController', () => {
  let usersController: UsersController;
  let userService: UsersService;
  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        findAll: jest.fn(() => []),
      }),
    };
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService, JwtService, JwtStrategy, ApiServiceProvider],
      controllers: [UsersController],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    userService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getAutoSuggestUsers', () => {
    it('should return an array of users', async () => {
      usersController.getAutoSuggestUsers(query);
      expect(await userService.getAutoSuggestUsers(query)).toHaveBeenCalled();
    });
  });
});
