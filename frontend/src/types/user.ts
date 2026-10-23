export type UserStatus = "active" | "banned";
export type UserRole = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  sessions: number;
  status: UserStatus;
  role?: UserRole;
}
