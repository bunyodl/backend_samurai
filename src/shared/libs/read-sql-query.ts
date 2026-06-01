import { readFile } from 'node:fs/promises';
import { resolvePath } from './resolve-path.js';

export const readSqlQuery = async (
  queryPath: string,
  callerUrl: string | URL,
) => {
  return await readFile(resolvePath(queryPath, callerUrl), 'utf-8');
};
