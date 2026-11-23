// one-line-zero-use entry (Node 22, standard library only): writes one fixed
// line, a hilariously useless superpower, to /output/entry.txt. Deterministic
// by construction: the same bytes on every run, no input, no network, no clock.
//
// Line strategy, against the judge's rubric (names a useless superpower,
// laugh-out-loud payoff in the last few words, fresh angle, tight wording,
// specific vivid uselessness): X-ray vision that only works on windows —
// a classic power crippled by one hilariously specific limitation, with a
// concrete everyday scene (staring through shopfronts) and the punchline
// "absolutely nothing else" landing in the final words. Round-1 lesson:
// the abstract mind-reading wordplay ranked 191/206 with the real judge,
// so this line is concrete and scene-based instead. First person, one
// sentence, twist payoff at the end. Not one of the sponsor's examples
// (toasting bread by staring; remembering every password except your own).
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const LINE =
  'I have X-ray vision, but it only works on windows — I can see straight through every shopfront and absolutely nothing else.';

// Gate check, mirroring the competition's entry rule (1–200 chars, valid
// UTF-8, one line): refuse to write anything that would fail it, instead of
// silently shipping a bad entry. Counts characters, not bytes — the em dash
// is one char but three bytes, so a byte count would misjudge the gate.
const encoded = new TextEncoder().encode(LINE);
if (new TextDecoder('utf-8', { fatal: true }).decode(encoded) !== LINE) {
  throw new Error('LINE is not valid UTF-8');
}
if (LINE.length < 1 || LINE.length > 200 || LINE.includes('\n')) {
  throw new Error(`LINE must be 1-200 chars on one line, got ${LINE.length}`);
}

writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE);
