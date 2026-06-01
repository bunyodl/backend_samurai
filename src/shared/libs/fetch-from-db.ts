import { pool } from '../../db/pool.js';

export const fetchFromDb = async <T>(query: string, params?: unknown[]): Promise<T> => {
  const result = await pool.query(query, params);
  return result.rows as T;
};
