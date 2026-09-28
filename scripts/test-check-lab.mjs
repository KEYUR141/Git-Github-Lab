import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const checker = join(dirname(fileURLToPath(import.meta.url)), 'check-lab.mjs');
const directory = mkdtempSync(join(tmpdir(), 'git-lab-check-'));

function git(...args) {
  return execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim();
}

function writeTeam(text) {
  writeFileSync(join(directory, 'teams', 'byte-builders-pc12.md'), text);
}

function runCheck(base) {
  return spawnSync(process.execPath, [checker], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      LAB_BASE_SHA: base,
      LAB_HEAD_REF: 'HEAD',
      LAB_HEAD_BRANCH: 'team/byte-builders-pc12',
      LAB_FROM_FORK: 'true',
    },
  });
}

try {
  git('init', '-b', 'main');
  git('config', 'user.name', 'Lab Tester');
  git('config', 'user.email', 'lab@example.com');
  mkdirSync(join(directory, 'teams'));
  writeFileSync(join(directory, 'README.md'), '# Lab\n');
  git('add', 'README.md');
  git('commit', '-m', 'Initial commit');
  const base = git('rev-parse', 'HEAD');

  git('switch', '-c', 'team/byte-builders-pc12');
  writeTeam('# Team: Byte Builders\n');
  git('add', 'teams/byte-builders-pc12.md');
  git('commit', '-m', 'lab: create team file');

  writeTeam('# Team: Byte Builders\n\nStudent 1 name: Asha Rao\nStudent 2 name: Ravi Shah\n');
  git('add', 'teams/byte-builders-pc12.md');
  git('commit', '-m', 'lab: add names');
  git('revert', 'HEAD', '--no-edit');

  writeTeam('# Team: Byte Builders\n\nStudent 1 name: Asha Rao\nStudent 1 department: CSE\nStudent 1 year: 2\nStudent 1 semester: 3\n\nStudent 2 name: Ravi Shah\nStudent 2 department: CSE\nStudent 2 year: 2\nStudent 2 semester: 3\n');
  git('add', 'teams/byte-builders-pc12.md');
  git('commit', '-m', 'lab: add final details');

  const passing = runCheck(base);
  assert.equal(passing.status, 0, passing.stdout + passing.stderr);

  writeTeam('# Team: Byte Builders\n\nStudent 1 name: Asha Rao\n');
  git('add', 'teams/byte-builders-pc12.md');
  git('commit', '-m', 'Remove required details');
  const failing = runCheck(base);
  assert.notEqual(failing.status, 0, failing.stdout + failing.stderr);

  console.log('Checker smoke test passed: complete PR accepted, incomplete PR rejected.');
} finally {
  rmSync(directory, { recursive: true, force: true });
}
