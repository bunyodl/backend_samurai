import { fetchFromDb } from '~/src/common/libs/fetch-from-db';
import { readSqlQuery } from '~/src/common/libs/read-sql-query';

import { mapUserRowToDto } from './helpers/map-user-row';
import type { GetUsersQuery } from './schemas/endpoints/get-users.schema';
import type { UserDto } from './schemas/resources/user.schema';
import type { UserRow } from './types/user-row.type';

const USER_COLUMNS = `
  id, first_name, last_name, email, image_url, role, created_at, updated_at
`;

const USER_SORT_COLUMNS = {
  firstName: 'first_name',
  lastName: 'last_name',
  email: 'email',
  role: 'role',
  createdAt: 'created_at',
} satisfies Record<NonNullable<GetUsersQuery['sortBy']>, keyof UserRow>;

type PublicUserRow = Omit<UserRow, 'password_hash'>;

class UserRepository {
  async getMany(params: GetUsersQuery): Promise<Array<UserDto>> {
    const sortColumn =
      USER_SORT_COLUMNS[params.sortBy ?? 'createdAt'] ??
      USER_SORT_COLUMNS.createdAt;
    const sortOrder = params.sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    let query: string;

    if (params.search) {
      query = `
        SELECT ${USER_COLUMNS} FROM users
        WHERE first_name ILIKE $1
        OR last_name ILIKE $1
        OR email ILIKE $1
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT $2 OFFSET $3
        `;
    } else {
      query = `
        SELECT ${USER_COLUMNS} FROM users
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT $1 OFFSET $2
        `;
    }

    const queryParams = params.search
      ? [
          `%${params.search}%`,
          params.limit ?? 10,
          ((params.page ?? 1) - 1) * (params.limit ?? 10),
        ]
      : [params.limit ?? 10, ((params.page ?? 1) - 1) * (params.limit ?? 10)];

    const rows = await fetchFromDb<Array<PublicUserRow>>(query, queryParams);
    return rows.map(mapUserRowToDto);
  }

  async getTotalCount(search?: string): Promise<number> {
    let query: string;

    if (!search) {
      query = `
      SELECT COUNT(*) FROM users
      `;
    } else {
      query = await readSqlQuery(
        './queries/get-users-count.sql',
        import.meta.url,
      );
    }

    const result = await fetchFromDb<Array<{ count: string }>>(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result[0]?.count ?? 0);
  }

  async getById(userId: string): Promise<UserDto | null> {
    const rows = await fetchFromDb<Array<PublicUserRow>>(
      `
        SELECT ${USER_COLUMNS} FROM users
        WHERE id = $1
        `,
      [userId],
    );

    const row = rows[0];
    return row ? mapUserRowToDto(row) : null;
  }
}

export const userRepository = new UserRepository();
