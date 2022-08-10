import { Injectable } from '@nestjs/common';
import { IGroup } from 'src/interfaces/group.interface';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from 'models/group';
import { GroupDto } from 'src/dto/group.dto';
@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

  async create(GroupDto: CreateGroupDto): Promise<IGroup> {
    const newGroup = {
      ...GroupDto,
      id: uuid(),
    };
    console.log(newGroup);
    const group = await this.groupRepository.create(newGroup);
    console.log(group);
    return group;
  }

  async getAllGroups(): Promise<IGroup[]> {
    const groups = await this.groupRepository.findAndCountAll();
    return groups.rows;
  }

  async findOne(id: string): Promise<IGroup> {
    return await this.groupRepository.findOne({ where: { id: id } });
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
