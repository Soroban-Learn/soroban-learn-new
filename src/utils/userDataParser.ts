import { UserProfileResponse } from '@/types';

export const userDataParser = (userInfo: UserProfileResponse) => {
  const parsedUser = {
    email: userInfo.email,
    first_name: userInfo.first_name,
    id: userInfo.id,
    last_name: userInfo.last_name,
    username: userInfo.username,
    avatar: userInfo.avatar,
  };
  
  return parsedUser;
};
