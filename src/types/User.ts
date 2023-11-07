export type UserRole = "student" | "admin";

export interface UserRoleInfo {
  id: string;
  name: UserRole;
}

export interface User {
  id: string;
  first_name: string;
  email: string;
  username: string;
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
  email?: string;
}
export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
}
