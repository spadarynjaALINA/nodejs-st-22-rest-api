import { Model } from 'sequelize-typescript';
interface UserGroupCreationAttrs {
    login: string;
    password: string;
}
export declare class UserGroups extends Model<UserGroups, UserGroupCreationAttrs> {
    id: string;
    userId: string;
    groupId: string;
}
export {};
