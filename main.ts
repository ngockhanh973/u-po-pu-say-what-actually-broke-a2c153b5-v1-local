import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

// The entry lives next to this script; the grader may invoke it from
// any working directory, so anchor everything to the script's folder.
const scriptDir = new URL('.', import.meta.url).pathname;
const entryPath = join(scriptDir, 'entry.txt');

// The harness points at the output folder through this variable.
// Fall back to a local "out" directory when it is not set.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : join(scriptDir, 'out');

if (!existsSync(entryPath)) {
  throw new Error(`entry file missing: ${entryPath}`);
}

mkdirSync(outputDir, { recursive: true });

// Read the line as text and write it back untouched: no trimming,
// no trailing newline added, so the shipped copy is byte-identical
// to the source and the run is deterministic.
const line = readFileSync(entryPath, 'utf8');

// The gate caps entries at 200 characters; fail loudly here instead
// of shipping a line the scorer would reject.
if (line.length > 200 || line.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
writeFileSync(join(outputDir, 'entry.txt'), line, 'utf8');
