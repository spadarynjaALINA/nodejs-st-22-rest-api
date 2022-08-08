import { Module } from '@nestjs/common';
import { GroupService } from '../../services/group/group.service';
import { GroupController } from '../../controllers/group/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from 'models/group';

@Module({
  providers: [GroupService],
  controllers: [GroupController],
  imports: [SequelizeModule.forFeature([Group])],
})
export class GroupModule {}
