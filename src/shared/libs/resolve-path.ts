import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootPath = path.join(__dirname, '../../..');

const toBaseDir = (base: string | URL): string => {
  if (base instanceof URL) {
    return path.dirname(fileURLToPath(base));
  }
  if (base.startsWith('file:')) {
    return path.dirname(fileURLToPath(base));
  }
  return base;
};

/**
 * Resolves paths:
 * - `~/...` — from project root
 * - absolute paths — returned as-is
 * - other relative paths — from `base` (import.meta.url or directory), or project root if omitted
 */
export const resolvePath = (
  relativePath: string,
  base?: string | URL,
): string => {
  if (relativePath.startsWith('~/')) {
    return path.join(rootPath, relativePath.slice(2));
  }

  if (path.isAbsolute(relativePath)) {
    return relativePath;
  }

  const baseDir = base ? toBaseDir(base) : rootPath;
  return path.resolve(baseDir, relativePath);
};
