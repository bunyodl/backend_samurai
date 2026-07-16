import type { UserDto } from '@/modules/user/schemas/resources/user.schema';
import type { UserRow } from '@/modules/user/types/user-row.type';

import { toIsoString } from '@/shared/libs/to-iso-string';

export function mapUserRowToDto(row: Omit<UserRow, 'password_hash'>): UserDto {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    imageUrl: row.image_url,
    role: row.role,
    createdAt: toIsoString(row.created_at),
    updatedAt: row.updated_at ? toIsoString(row.updated_at) : null,
  };
}
