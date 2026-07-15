import type { NonEmptyArray, ValueOf } from '@/shared/types/utility-types.type';

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = ValueOf<typeof USER_ROLES>;
export const USER_ROLE_VALUES = Object.values(
  USER_ROLES,
) as NonEmptyArray<UserRole>;
