import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const rootPath = path.join(__dirname, '../../..');

/**
 * Resolves the path with alias "~" or relative path
 */
export const resolvePath = (...segments: string[]) => {
  if (segments.length === 1 && segments[0].startsWith('~/')) {
    // ~/db/events.json -> [rootPath, 'db/events.json']
    return path.join(rootPath, segments[0].slice(2));
  }
  return path.join(rootPath, ...segments);
};
