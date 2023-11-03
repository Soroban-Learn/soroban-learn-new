export type UserRole = "student" | "admin";

export interface UserRoleInfo {
  id: string;
  name: UserRole;
}

export interface User {
  id: string;
  first_name: string;
  email: string;
  role_info: UserRoleInfo[];
}
