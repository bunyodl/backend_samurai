import { readFile } from 'node:fs/promises';
import { delay } from '@/shared/libs/delay';
import { resolvePath } from '@/shared/libs/resolve-path';

export const mockFetch = async (path: string) => {
  const resolvedPath = resolvePath(path);
  await delay(1000);
  return await readFile(resolvedPath, 'utf-8');
};
