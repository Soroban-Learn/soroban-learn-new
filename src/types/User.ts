export type UserRole = 'student' | 'admin';

export interface UserRoleInfo {
  id: string;
  name: UserRole;
}

export interface User {
  id: string;
  first_name: string;
  email: string;
  username: string;
  avatar?: string;
  role_info: UserRoleInfo[];
}

export interface RegisterForCourseParams {
  courseId: string;
}

export interface RegisterForCourseResponse {
  success: boolean;
  message: string;
}

export interface UserProfileUpdateParams {
  name?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}
export interface UserProfileResponse extends Omit<User, 'role_info'> {}
