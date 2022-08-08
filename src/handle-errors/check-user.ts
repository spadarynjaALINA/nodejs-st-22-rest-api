export const checkUser = (user) => {
  if (!user) {
    throw new Error('byId');
  }
  return user;
};
export const checkGroup = (group) => {
  if (!group) {
    throw new Error('byId');
  }
};
