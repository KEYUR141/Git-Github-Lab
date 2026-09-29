import { execFileSync } from 'node:child_process';

const base = process.env.LAB_BASE_SHA;
const head = process.env.LAB_HEAD_REF;
const branch = process.env.LAB_HEAD_BRANCH;
const fromFork = process.env.LAB_FROM_FORK;

if (!base || !head) {
  console.error('This checker needs the pull request base and head Git refs.');
  process.exit(2);
}

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
}

function fileAt(commit, path) {
  try {
    return git('show', `${commit}:${path}`).replace(/\r\n/g, '\n').trimEnd();
  } catch {
    return null;
  }
}

function isPlaceholder(value) {
  return /^(?:-|n\/a|todo|your(?:[_ -].*)?|student_[12]_.+|first student|second student)$/i.test(value);
}

function field(text, label) {
  const line = text?.split('\n').find((entry) => entry.split(':', 1)[0].trim().toLowerCase() === label.toLowerCase());
  const value = line?.slice(line.indexOf(':') + 1).trim();
  return value && !isPlaceholder(value) ? value : null;
}

const results = [];
function check(label, passed, detail) {
  results.push(Boolean(passed));
  console.log(`${passed ? 'PASS' : 'FAIL'} ${label}${detail ? ` — ${detail}` : ''}`);
}

check('Fork', fromFork === 'true', 'Open the PR from your own fork.');
const pcNumber = /^team\/pc([1-9][0-9]*)$/.exec(branch ?? '')?.[1];
check('Working branch', Boolean(pcNumber), 'Use team/pc followed by your assigned PC number, for example team/pc12.');

const changes = git('diff', '--name-status', base, head).split(/\r?\n/).filter(Boolean);
const onlyFile = changes.length === 1 ? changes[0].split('\t') : [];
const path = onlyFile[1];
const validPath = onlyFile[0] === 'A' && Boolean(pcNumber) && path === `teams/pc${pcNumber}.md`;
check('One new team file', validPath, 'Add only teams/pcYOUR_PC_NUMBER.md, matching your branch.');

if (validPath) {
  const commits = git('rev-list', '--reverse', `${base}..${head}`).split(/\r?\n/).filter(Boolean);
  const subjects = commits.map((sha) => git('log', '-1', '--format=%s', sha));
  const expected = ['lab: create team file', 'lab: add names', 'Revert "lab: add names"', 'lab: add final details'];
  const positions = [];
  let previous = -1;
  for (const subject of expected) {
    const position = subjects.findIndex((value, index) => index > previous && value === subject);
    positions.push(position);
    previous = position;
  }
  const ordered = positions.every((position) => position >= 0);
  check('Four task commits in order', ordered, 'Use the commit messages in the README and git revert HEAD --no-edit.');

  if (ordered) {
    const [created, named, reverted, completed] = positions.map((position) => fileAt(commits[position], path));
    const final = fileAt(head, path);
    const teamName = created?.match(/^# Team:\s*(.+)$/m)?.[1]?.trim();
    const firstVersion = Boolean(teamName && !isPlaceholder(teamName) && created.split('\n').filter(Boolean).length === 1);
    check('Task 1: file with team heading', firstVersion, 'Commit the heading by itself.');
    check('Task 2: both names', Boolean(field(named, 'Student 1 name') && field(named, 'Student 2 name')), 'Add both names in the second commit.');
    check('Task 3: revert restored first version', reverted === created, 'Revert the names commit before adding final details.');

    const labels = ['Student 1 name', 'Student 1 department', 'Student 1 year', 'Student 1 semester', 'Student 2 name', 'Student 2 department', 'Student 2 year', 'Student 2 semester'];
    const finalComplete = labels.every((label) => field(completed, label) && field(final, label));
    check('Task 4: both students’ final details', finalComplete, 'Fill all eight labelled fields.');
  }
}

console.log('\nGitHub Star and each student’s participation are checked by the instructor.');
if (results.some((passed) => !passed)) process.exitCode = 1;
