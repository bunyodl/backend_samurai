import type { UserRole } from '@/modules/user/constants/user.constants';

import type { RowTimestamps } from '@/db/types/row-timestamps.type';

export interface UserRow extends RowTimestamps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image_url: string | null;
  role: UserRole;
  password_hash: string;
}

export type PublicUserRow = Omit<UserRow, 'password_hash'>;
