import { Injectable } from '@nestjs/common';
import { IGroup } from 'src/interfaces/group.interface';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'models/user';
import { AddUserDto } from 'src/dto/addUser';
import { handleError } from 'src/handle-errors/handleError';
@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(User) private userRepository: typeof User,
    private sequelize: Sequelize,
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
    try {
      await this.sequelize.transaction(async (t) => {
        const group = await this.groupRepository.findOne({
          where: { id: id },
          transaction: t,
        });
        if (group) {
          const user = await this.groupRepository.findOne({
            where: { id: id },
            transaction: t,
          });
          if (user) {
            return await group.$add('user', addUserDto.userIds, {
              transaction: t,
            });
          } else {
            return handleError('byIdGroup');
          }
        } else {
          return handleError('byId');
        }
      });
      return await this.findOne(id);
    } catch (err) {
      throw err;
    }
  }
  async getAllGroups(): Promise<IGroup[]> {
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
    return groups;
  }

  async findOne(id: string): Promise<IGroup> {
    return await this.groupRepository.findOne({
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
  }

  async update(updateGroupDto: IGroup): Promise<IGroup> {
    const group = await this.groupRepository.update(updateGroupDto, {
      where: { id: updateGroupDto.id },
      returning: true,
    });
    return group[1][0];
  }

  async remove(id: string): Promise<IGroup> {
    const group = await this.groupRepository.destroy({
      where: { id },
    });
    return group[1][0];
  }
}
