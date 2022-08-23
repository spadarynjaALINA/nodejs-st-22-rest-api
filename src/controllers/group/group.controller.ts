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
import { CreateGroupDto } from './../../dto/create-Group.dto';
import { GroupService } from './../../services/group/group.service';
import { IGroup } from './../../interfaces/group.interface';
import { AddUserDto } from './../../dto/addUser';
import { JwtAuthGuard } from './../../quards/jwt-auth.guard';
@Controller('groups')
@UseGuards(JwtAuthGuard)
export class GroupController {
  constructor(private readonly GroupsService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto) {
    return await this.GroupsService.create(createGroupDto);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  async addUsersToGroup(@Param('id') id: string, @Body() addUser: AddUserDto) {
    return await this.GroupsService.addUsersToGroup(addUser, id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAutoSuggestGroups() {
    return await this.GroupsService.getAutoSuggestGroups();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.GroupsService.findOne(id);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(@Body() GroupDto: IGroup) {
    return await this.GroupsService.update(GroupDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.GroupsService.remove(id);
  }
}
