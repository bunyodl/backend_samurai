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

async function readSql(path: string) {
  return await readSqlQuery(path, import.meta.url);
}

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
    const query = search
      ? await readSql('./queries/get-users-count-by-search.sql')
      : await readSql('./queries/get-users-count.sql');

    const result = await fetchFromDb<Array<{ count: string }>>(
      query,
      search ? [`%${search}%`] : undefined,
    );

    return Number(result[0]?.count ?? 0);
  }

  async getById(userId: string): Promise<PublicUserRow | null> {
    const query = await readSql('./queries/get-user-by-id.sql');
    const rows = await fetchFromDb<Array<PublicUserRow>>(query, [userId]);

    return rows[0] ?? null;
  }

  async getByEmail(email: string): Promise<PublicUserRow | null> {
    const query = await readSql('./queries/get-user-by-email.sql');
    const rows = await fetchFromDb<Array<PublicUserRow>>(query, [email]);
    return rows[0] ?? null;
  }

  async create(
    body: CreateUserRequestBody,
    hashedPassword: string,
  ): Promise<PublicUserRow> {
    const query = await readSql('./queries/create-user.sql');

    const rows = await fetchFromDb<Array<PublicUserRow>>(query, [
      body.firstName,
      body.lastName,
      body.email,
      body.imageUrl,
      body.role,
      hashedPassword,
    ]);

    return rows[0]!;
  }

  async delete(userId: string): Promise<PublicUserRow | null> {
    const query = await readSql('./queries/delete-user.sql');

    const rows = await fetchFromDb<Array<PublicUserRow>>(query, [userId]);
    return rows[0] ?? null;
  }
}

export const userRepository = new UserRepository();
