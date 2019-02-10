import fs from 'fs';
import path from 'path';

export function resolvePath(relativePath: string) {
  // yarn can be executing at the root of the mono-repo.
  // relying on process.cwd() will be wrong.
  return path.resolve(__dirname, '..', relativePath)
}

export function ensureNotExist(filepath: string) {
  const f = resolvePath(filepath)
  if (fs.existsSync(f)) {
    fs.unlinkSync(f)
  }
}
