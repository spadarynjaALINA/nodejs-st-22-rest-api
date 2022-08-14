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
  UseGuards,
} from '@nestjs/common';
import { handleError } from './../../handle-errors/handleError';
import { CreateGroupDto } from './../../dto/create-Group.dto';
import { GroupService } from './../../services/group/group.service';
import { checkGroup } from './../../handle-errors/check-user';
import { IGroup } from './../../interfaces/group.interface';
import { AddUserDto } from './../../dto/addUser';
import { JwtAuthGuard } from 'src/quards/jwt-auth.guard';
@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly GroupsService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.GroupsService.create(createGroupDto).catch((err) => {
      handleError(err, createGroupDto.name, createGroupDto.name);
    });
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async addUsersToGroup(@Param('id') id: string, @Body() addUser: AddUserDto) {
    return await this.GroupsService.addUsersToGroup(addUser, id).catch((err) =>
      handleError(err),
    );
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
