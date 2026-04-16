export const getAuthConfig = (getState) => {
  const currentUser = getState().loginUserReducer.currentUser;

  return {
    headers: {
      Authorization: currentUser && currentUser.token ? `Bearer ${currentUser.token}` : "",
    },
  };
};
