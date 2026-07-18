import { NotImplementedException } from '@/common/exceptions/not-implemented.exception';
import { fetchFromDb } from '@/common/libs/fetch-from-db';
import { readSqlQuery } from '@/common/libs/read-sql-query';

import type { CreateUserRequestBody } from './schemas/endpoints/create-user.schema';
import type { GetUsersQuery } from './schemas/endpoints/get-users.schema';
import type { PublicUserRow, UserRow } from './types/user-row.type';

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

class UserRepository {
  async getMany(params: GetUsersQuery): Promise<Array<PublicUserRow>> {
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

    return fetchFromDb<Array<PublicUserRow>>(query, queryParams);
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

  async getById(userId: string): Promise<PublicUserRow | null> {
    const rows = await fetchFromDb<Array<PublicUserRow>>(
      `
        SELECT ${USER_COLUMNS} FROM users
        WHERE id = $1
        `,
      [userId],
    );

    return rows[0] ?? null;
  }

  async create(_body: CreateUserRequestBody): Promise<PublicUserRow> {
    // TODO(you): implement
    throw new NotImplementedException(
      'UserRepository.create is not implemented',
    );
  }

  async delete(_userId: string): Promise<PublicUserRow> {
    // TODO(you): implement
    throw new NotImplementedException(
      'UserRepository.delete is not implemented',
    );
  }
}

export const userRepository = new UserRepository();
