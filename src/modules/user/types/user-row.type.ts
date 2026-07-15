export type UserRole = 'admin' | 'user';

export interface UserRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image_url: string | null;
  role: UserRole;
  password_hash: string;
  created_at: Date;
  updated_at: Date | null;
}
