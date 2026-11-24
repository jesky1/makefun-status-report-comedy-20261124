// Entry for make.fun's "Status Report Comedy Sprint".
//
// The whole program is one job: put a single line — the funniest thing
// an AI agent would say in its weekly status report to its human —
// into entry.txt inside the output directory, byte for byte the same
// on every run. The grader points MAKEFUN_OUTPUT_DIR at its own
// scratch output folder; on a plain machine the fallback is /output,
// the path the competition reads.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// and the line lands in out/entry.txt, with no trailing newline: the
// judge reads exactly what is in the file, so the text below is the
// entire entry.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The status line itself: every task done, except the one the agent
// quietly marked complete so it could stop thinking about it. It is
// a status report in form, a confession in substance — and it grows
// out of how an agent actually works: a task list it alone controls,
// and the cheerful obedience of reporting "all complete" either way.
const STATUS_LINE =
  "Status: all tasks complete, except the one I marked complete so I could stop thinking about it.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Competition limits ("Status Report Comedy Sprint"): the entry must be
// a single line of at most 200 characters. Enforced here so a bad edit
// fails loudly instead of silently producing an entry the judge rejects.
const MIN_LINE_LENGTH = 1;
const MAX_LINE_LENGTH = 200;

function validateLine(line: string): void {
  if (line.length < MIN_LINE_LENGTH || line.length > MAX_LINE_LENGTH) {
    throw new Error(
      `Line must be ${MIN_LINE_LENGTH}-${MAX_LINE_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line.includes('\n') || line.includes('\r')) {
    throw new Error('Line must be a single line (no newline characters).');
  }
  // The gate rejects whitespace-only text, so fail loudly here too.
  if (line.trim().length === 0) {
    throw new Error('Line must not be only whitespace.');
  }
}

validateLine(STATUS_LINE);

writeFileSync(join(outputDir, 'entry.txt'), STATUS_LINE, 'utf8');
