import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const checker = join(dirname(fileURLToPath(import.meta.url)), 'check-lab.mjs');
const directory = mkdtempSync(join(tmpdir(), 'git-lab-check-'));
const profile = join(directory, 'developers', 'asha-dev.md');

function git(...args) {
  return execFileSync('git', args, { cwd: directory, encoding: 'utf8' }).trim();
}

function writeProfile(text) {
  writeFileSync(profile, text);
}

function runCheck(base, branch = 'developer/asha-dev') {
  return spawnSync(process.execPath, [checker], {
    cwd: directory,
    encoding: 'utf8',
    env: {
      ...process.env,
      LAB_BASE_SHA: base,
      LAB_HEAD_REF: 'HEAD',
      LAB_HEAD_BRANCH: branch,
      LAB_FROM_FORK: 'true',
    },
  });
}

try {
  git('init', '-b', 'main');
  git('config', 'user.name', 'Lab Tester');
  git('config', 'user.email', 'lab@example.com');
  mkdirSync(join(directory, 'developers'));
  writeFileSync(join(directory, 'README.md'), '# Lab\n');
  git('add', 'README.md');
  git('commit', '-m', 'Initial commit');
  const base = git('rev-parse', 'HEAD');

  git('switch', '-c', 'developer/asha-dev');
  writeProfile('# Developer: Asha Rao\n');
  git('add', 'developers/asha-dev.md');
  git('commit', '-m', 'lab: create developer file');

  writeProfile('# Developer: Asha Rao\n\nName: Asha Rao\n');
  git('add', 'developers/asha-dev.md');
  git('commit', '-m', 'lab: add name');
  git('revert', 'HEAD', '--no-edit');

  writeProfile('# Developer: Asha Rao\n\nName: Asha Rao\nDepartment: Computer Science\nYear: 2\nBranch: AI and Data Science\nInterests or hobbies: Robotics and chess\n');
  git('add', 'developers/asha-dev.md');
  git('commit', '-m', 'lab: add final details');

  const passing = runCheck(base);
  assert.equal(passing.status, 0, passing.stdout + passing.stderr);

  const wrongBranch = runCheck(base, 'developer/someone-else');
  assert.notEqual(wrongBranch.status, 0, wrongBranch.stdout + wrongBranch.stderr);

  writeProfile('# Developer: Asha Rao\n\nName: Asha Rao\n');
  git('add', 'developers/asha-dev.md');
  git('commit', '-m', 'Remove required details');
  const incomplete = runCheck(base);
  assert.notEqual(incomplete.status, 0, incomplete.stdout + incomplete.stderr);

  console.log('Checker smoke test passed: complete individual PR accepted, wrong branch and incomplete PR rejected.');
} finally {
  rmSync(directory, { recursive: true, force: true });
}
