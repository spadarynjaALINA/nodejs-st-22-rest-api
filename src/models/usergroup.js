'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class userGroups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userGroups.init(
    {
      groupId: DataTypes.STRING,
      userId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'userGroups',
    },
  );
  return userGroups;
};
