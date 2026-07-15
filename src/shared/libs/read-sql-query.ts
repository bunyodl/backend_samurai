import { readFile } from 'node:fs/promises';

import { resolvePath } from '@/shared/libs/resolve-path';

export const readSqlQuery = async (
  queryPath: string,
  callerUrl: string | URL,
) => {
  return await readFile(resolvePath(queryPath, callerUrl), 'utf-8');
};
