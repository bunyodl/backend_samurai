import { readFile } from 'node:fs/promises';
import { delay } from './delay.js';
import { resolvePath } from './resolve-path.js';

export const mockFetch = async (path: string) => {
  const resolvedPath = resolvePath(path);
  await delay(1000);
  return await readFile(resolvedPath, 'utf-8');
};
