import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where this script lives on disk, resolved from its own URL so the
// entry file is found no matter which folder the grader starts from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.txt');

// The harness tells us where finished entries belong; without that
// hint we drop the copy into a local "out" folder beside the script.
function resolveOutDir(): string {
  const hint = process.env.MAKEFUN_OUTPUT_DIR;
  return hint ? resolve(hint) : join(here, 'out');
}

const outDir = resolveOutDir();
mkdirSync(outDir, { recursive: true });

// A plain byte-for-byte copy: the line is shipped exactly as written,
// no newline added, no trimming, no re-encoding, so two runs produce
// identical output every time.
copyFileSync(source, join(outDir, 'entry.txt'));
