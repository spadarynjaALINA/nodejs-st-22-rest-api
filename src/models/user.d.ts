import { Model } from 'sequelize-typescript';
import { Group } from './group';
interface UserCreationAttrs {
    login: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttrs> {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
    group: Group[];
}
export {};
