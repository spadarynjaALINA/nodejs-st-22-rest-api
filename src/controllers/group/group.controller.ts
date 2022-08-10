import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { handleError } from 'src/handle-errors/handleError';
import { CreateGroupDto } from 'src/dto/create-Group.dto';
import { GroupService } from 'src/services/group/group.service';
import { checkGroup } from 'src/handle-errors/check-user';
import { IGroup } from 'src/interfaces/group.interface';
@Controller('groups')
export class GroupController {
  constructor(private readonly GroupsService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.GroupsService.create(createGroupDto).catch((err) => {
      handleError(err, createGroupDto.name, createGroupDto.name);
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAutoSuggestGroups() {
    return await this.GroupsService.getAllGroups().catch((err) =>
      handleError(err),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.GroupsService.findOne(id)
      .then((Group) => checkGroup(Group))
      .catch((err) => handleError(err, id));
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() GroupDto: IGroup) {
    return await this.GroupsService.update(GroupDto)
      .then((Group) => checkGroup(Group))
      .catch((err) => handleError(err, GroupDto.id, GroupDto.name));
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.GroupsService.remove(id)
      .then((Group) => checkGroup(Group))
      .catch((err) => handleError(err, id));
  }
}
