import { Injectable } from '@nestjs/common';
import { IGroup } from './../../interfaces/group.interface';
import { v4 as uuid } from 'uuid';
import { CreateGroupDto } from './../../dto/create-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './../../models/group';
import { Sequelize } from 'sequelize-typescript';
import { User } from './../../models/user';
import { AddUserDto } from './../../dto/addUser';
import { handleError } from './../../handle-errors/handleError';
import { check, checkGroup, checkUser } from './../../handle-errors/check-user';
import { UsersService } from '../users/users.service';
@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private sequelize: Sequelize,
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async create(GroupDto: CreateGroupDto): Promise<IGroup> {
    const newGroup = {
      ...GroupDto,
      id: uuid(),
    };
    const group = await this.groupRepository.create(newGroup);
    return group;
  }
  async addUsersToGroup(addUserDto: AddUserDto, id: string) {
    await this.sequelize.transaction(async (t) => {
      const group = await this.groupRepository
        .findOne({
          where: { id: id },
          transaction: t,
        })
        .then((group) => checkGroup(group, id));

      await this.userRepository
        .findOne({
          where: { id: addUserDto.userIds[0] },
          transaction: t,
        })
        .then((user) => checkUser(user, addUserDto.userIds[0]));
      return await group.$add('user', addUserDto.userIds, {
        transaction: t,
      });
    });
    return this.findOne(id);
  }
  async getAutoSuggestGroups(): Promise<IGroup[]> {
    const groups = await this.groupRepository.findAll({
      include: [
        {
          model: User,
          as: 'user',
          where: { isDeleted: false },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return check(groups);
  }

  async findOne(id: string): Promise<IGroup> {
    const group = await this.groupRepository.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          as: 'user',
          where: { isDeleted: false },
          through: {
            attributes: [],
          },
        },
      ],
    });
    return checkGroup(group, id);
  }

  async update(updateGroupDto: IGroup): Promise<IGroup> {
    const group = await this.groupRepository.update(updateGroupDto, {
      where: { id: updateGroupDto.id },
      returning: true,
    });
    return checkGroup(group[1][0], updateGroupDto.id);
  }

  async remove(id: string): Promise<IGroup> {
    const group = await this.groupRepository.destroy({
      where: { id },
    });
    return checkGroup(group[1][0], id);
  }
}
