export const checkUser = (user) => {
  if (!user) {
    throw new Error('byId');
  }
  return user;
};
