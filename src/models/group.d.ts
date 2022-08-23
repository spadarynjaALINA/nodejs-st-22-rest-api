import { Model } from 'sequelize-typescript';
import { Permission } from 'src/interfaces/group.interface';
import { User } from './user';
interface GroupCreationAttrs {
    name: string;
    permission: Permission[];
}
export declare class Group extends Model<Group, GroupCreationAttrs> {
    id: string;
    name: string;
    permissions: Permission[];
    user: User[];
}
export {};
