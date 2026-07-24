import { readSqlQuery } from '@/common/libs/read-sql-query';

async function readSql(path: string) {
  return await readSqlQuery(path, import.meta.url);
}

class AuthRepository {}

export const authRepository = new AuthRepository();