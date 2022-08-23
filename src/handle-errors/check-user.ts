import { handleError } from './handleError';

export const checkUser = (user, id?) => {
  try {
    if (!user) throw new Error('byId');
    return user;
  } catch (error) {
    handleError(error, id);
  }
};
export const check = (item) => {
  try {
    if (!item) {
      throw new Error('item');
    } else {
      return item;
    }
  } catch (error) {
    handleError(error);
  }
};

export const checkGroup = (group, id?) => {
  try {
    if (!group) throw new Error('byIdGroup');
    return group;
  } catch (error) {
    handleError(error, id);
  }
};
