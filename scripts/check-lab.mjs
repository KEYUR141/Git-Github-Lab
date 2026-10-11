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
  return /^(?:-|n\/a|todo|your(?:[_ -].*)?|student(?:[_ -].*)?)$/i.test(value);
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
const username = /^developer\/([A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?)$/.exec(branch ?? '')?.[1];
check('Working branch', Boolean(username) && username.toLowerCase() !== 'your-github-username', 'Use developer/YOUR_GITHUB_USERNAME.');

const changes = git('diff', '--name-status', base, head).split(/\r?\n/).filter(Boolean);
const onlyFile = changes.length === 1 ? changes[0].split('\t') : [];
const path = onlyFile[1];
const validPath = onlyFile[0] === 'A' && Boolean(username) && path?.toLowerCase() === `developers/${username.toLowerCase()}.md`;
check('One new developer file', validPath, 'Add only developers/YOUR_GITHUB_USERNAME.md, matching your branch.');

if (validPath) {
  const commits = git('rev-list', '--reverse', `${base}..${head}`).split(/\r?\n/).filter(Boolean);
  const subjects = commits.map((sha) => git('log', '-1', '--format=%s', sha));
  const expected = ['lab: create developer file', 'lab: add name', 'Revert "lab: add name"', 'lab: add final details'];
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
    const fullName = created?.match(/^# Developer:\s*(.+)$/m)?.[1]?.trim();
    const firstVersion = Boolean(fullName && !isPlaceholder(fullName) && created.split('\n').filter(Boolean).length === 1);
    check('Task 1: file with developer heading', firstVersion, 'Commit only the heading first.');
    check('Task 2: name added', Boolean(field(named, 'Name') && field(named, 'Name') === fullName), 'Add your name in the second commit.');
    check('Task 3: revert restored first version', reverted === created, 'Revert the name commit before adding final details.');

    const labels = ['Name', 'Department', 'Year', 'Branch', 'Interests or hobbies'];
    const finalComplete = labels.every((label) => field(completed, label) && field(final, label)) &&
      field(completed, 'Name') === fullName && field(final, 'Name') === fullName;
    check('Task 4: final developer details', finalComplete, 'Fill in name, department, year, academic branch, and interests or hobbies.');
  }
}

console.log('\nGitHub Star is checked by the instructor.');
if (results.some((passed) => !passed)) process.exitCode = 1;
