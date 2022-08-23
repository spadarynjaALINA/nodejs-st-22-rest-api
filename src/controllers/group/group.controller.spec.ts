/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { IGroup } from 'src/interfaces/group.interface';
import { Group } from './../../models/group';
import { GroupService } from './../../services/group/group.service';
import { GroupController } from './group.controller';
import { AddUserDto } from './../../dto/addUser';
describe('GroupsController', () => {
  let controller: GroupController;
  let groupService: GroupService;
  const group: IGroup = {
    id: '5e75fb2a-8202-4891-9880-d875bdaff76e',
    name: 'abg',
    permissions: ['READ'],
  };
  const newGroup: CreateGroupDto = {
    name: 'abcde',
    permissions: ['READ'],
  };
  const addUser: AddUserDto = {
    userIds: ['5a483d1f-64c5-4df2-a2c3-878c1a206794'],
  };
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: GroupService,
      useFactory: () => ({
        getAutoSuggestGroups: jest.fn(() => []),
        findOne: jest.fn(() => group),
        create: jest.fn(() => {}),
        addUsersToGroup: jest.fn(() => {}),
        remove: jest.fn(() => {}),
        update: jest.fn(() => {}),
        models: { Group },
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupService, ApiServiceProvider],
      controllers: [GroupController],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    groupService = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('calling getAllGroups method', async () => {
    await controller.getAutoSuggestGroups();
    expect(groupService.getAutoSuggestGroups).toHaveBeenCalled();
  });

  it('calling findOne method', async () => {
    await controller.findOne('5e75fb2a-8202-4891-9880-d875bdaff76e');
    expect(groupService.findOne).toHaveBeenCalled();
  });
  it('calling update method', async () => {
    await controller.update(group);
    expect(groupService.update).toHaveBeenCalled();
  });

  it('calling create method', async () => {
    await controller.create(newGroup);
    expect(groupService.create).toHaveBeenCalled();
  });
  it('calling remove method', async () => {
    await controller.remove('5e75fb2a-8202-4891-9880-d875bdaff76e');
    expect(groupService.remove).toHaveBeenCalled();
  });

  it('calling addUsersToGroup method', async () => {
    await controller.addUsersToGroup(
      '5e75fb2a-8202-4891-9880-d875bdaff76e',
      addUser,
    );
    expect(groupService.addUsersToGroup).toHaveBeenCalled();
  });
});
