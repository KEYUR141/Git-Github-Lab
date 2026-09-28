# Git & GitHub Lab

A hands-on Git and GitHub exercise from the AI Club at G.H. Raisoni University, Saikheda. Work in pairs: one computer, one team file, and one pull request (PR) per pair.

**Goal:** Make a change, save it in commits, undo one commit without deleting history, and propose the finished work through a PR.

## Before the lab

- Both students should have a GitHub account. Verify your email before the session.
- The lab computer needs Git and an editor such as VS Code or Notepad.
- Decide on a team name and note your computer number. Your file name will be `teams/YOUR_TEAM_SLUG.md`, where the slug includes both (for example, `byte-builders-pc12`).
- Use Git Bash for the commands below. Keep the same terminal open so the variables you set remain available.
- This is a public repository. The names and academic details you submit will be publicly visible.

**Replace every placeholder before using it.** `YOUR_TEAM_NAME` is the readable team name in the file. `TEAM_SLUG` is its lowercase, hyphenated form plus the computer number. For example, a team called *Byte Builders* on computer 12 would use `byte-builders-pc12`. The original repository name `KEYUR141/Git-Github-Lab` is fixed; leave it as written.

## 1. Star, fork, and clone

1. Open **[KEYUR141/Git-Github-Lab](https://github.com/KEYUR141/Git-Github-Lab)** and click **Star**.
2. Click **Fork** and create a copy under one student's GitHub account. The second student should take turns at the keyboard and check each change.
3. On your fork, click **Code**. Replace `your-github-username` below with the account that owns the fork, then run:

```bash
GITHUB_USERNAME="your-github-username"
git clone "https://github.com/${GITHUB_USERNAME}/Git-Github-Lab.git"
cd Git-Github-Lab
git remote -v
git status
```

`origin` should point to **your fork**, not to Keyur's repository. If Git asks you to sign in when you push, use the browser sign-in flow. Do not put a password or access token in a file.

Set the commit identity for this repository. Use the email associated with the account that owns the fork, or its GitHub-provided no-reply email:

```bash
git config --local user.name "YOUR_FULL_NAME"
git config --local user.email "YOUR_GITHUB_EMAIL"
git config --local --list
```

## 2. Make a branch

Set `TEAM_SLUG` once. Replace `your-team-name-pc-number` with a unique lowercase name using letters, numbers, and hyphens, such as `byte-builders-pc12`. Keep the computer number in it. Then bring your fork's `main` up to date and create a branch:

```bash
TEAM_SLUG="your-team-name-pc-number"
git switch main
git pull --ff-only origin main
git switch -c "team/${TEAM_SLUG}"
git branch --show-current
```

Keep your work on this branch. Do not commit directly to `main`.

## Task 1 — Create your team file

Create `teams/YOUR_TEAM_SLUG.md` with **only** a heading at first. Replace `YOUR_TEAM_NAME` with your chosen display name; the filename uses the lowercase slug from above:

```md
# Team: YOUR_TEAM_NAME
```

Git tracks files, not empty folders, so create the `.md` file inside the existing `teams` folder. Inspect, stage, and commit it:

```bash
git status
git diff -- "teams/${TEAM_SLUG}.md"
git add "teams/${TEAM_SLUG}.md"
git diff --staged
git commit -m "lab: create team file"
git log --oneline -1
```

> `git diff` does not show an untracked file until it is staged. After `git add`, `git diff --staged` shows what the commit will contain.

## Task 2 — Add both names

Add these two lines under the heading, with your real names:

```md
Student 1 name: STUDENT_1_FULL_NAME
Student 2 name: STUDENT_2_FULL_NAME
```

Then make a second commit:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git diff --staged
git commit -m "lab: add names"
git log --oneline -2
```

## Task 3 — Revert the names commit

The most recent commit is the one that added the names. Undo it with:

```bash
git revert HEAD --no-edit
git log --oneline -3
git status
```

Open your team file. It should contain only the original heading again. `git revert` created a **new commit** that reversed the names commit; it did not erase that commit from history.

## Task 4 — Add the final details

Add both names again, this time with department, year, and semester **for each student**. Replace the example values:

```md
# Team: YOUR_TEAM_NAME

Student 1 name: STUDENT_1_FULL_NAME
Student 1 department: STUDENT_1_DEPARTMENT
Student 1 year: STUDENT_1_YEAR
Student 1 semester: STUDENT_1_SEMESTER

Student 2 name: STUDENT_2_FULL_NAME
Student 2 department: STUDENT_2_DEPARTMENT
Student 2 year: STUDENT_2_YEAR
Student 2 semester: STUDENT_2_SEMESTER
```

Check and commit the completed file:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git commit -m "lab: add final details"
git log --oneline -4
git status
```

You should now see four commits from your pair: create, add names, revert, and final details.

## Task 5 — Push and open a pull request

```bash
git push -u origin "team/${TEAM_SLUG}"
git remote -v
```

On your fork's GitHub page, click **Contribute → Open pull request** (or **Compare & pull request**). Check that:

- **Base repository:** `KEYUR141/Git-Github-Lab`, branch `main`
- **Head repository:** your fork, branch `team/YOUR_TEAM_SLUG`
- The PR changes **only your team's file**.

Give the PR a title such as `Add YOUR_TEAM_NAME (PC YOUR_PC_NUMBER)`, replacing both placeholders. Submit it and wait for the lab checker. If GitHub asks the repository owner to approve the check for a first-time contributor, tell the instructor. Your PR is still submitted. The instructor or AI Club team will review and merge it; students do not need write access to the original repository.

## If there is time: fetch, merge, and pull

Your fork's `origin` and the original repository are different remotes. Add the original repository as `upstream` and see whether any other teams have been merged:

```bash
git remote add upstream https://github.com/KEYUR141/Git-Github-Lab.git
git fetch upstream
git log --oneline --max-count=5 upstream/main
git merge upstream/main
```

If Git reports `Already up to date`, no new upstream commits need merging. After the instructor merges PRs, you can update your local `main` with:

```bash
git switch main
git pull upstream main
git log --oneline --max-count=5
```

## What the lab checker verifies

The check runs when you open or update a PR. It verifies that your PR comes from a fork and a `team/` branch, adds one uniquely named Markdown file under `teams/`, has the four task commits in order, shows the revert restoring the first file version, and contains both students' final details. It cannot verify a GitHub star or prove which student typed a command; the instructor checks participation during the lab.

If the check fails, read its output in the PR's **Checks** tab, fix your branch, and push again. Ask for help before rewriting or deleting commits.

## Command reminder

| Command | What you used it for |
| --- | --- |
| `git clone` | Download your fork to the lab computer |
| `git config --local` | Set the identity recorded on commits in this repository |
| `git remote -v` | See where fetches and pushes go |
| `git switch -c` | Create and enter your working branch |
| `git status` | See changed, staged, and untracked files |
| `git diff` / `git diff --staged` | Review changes before and after staging |
| `git add` | Stage a file for the next commit |
| `git commit` | Save a project version |
| `git log --oneline` | Read the commit history |
| `git revert` | Undo a committed change with a new commit |
| `git push` | Send your branch to your fork on GitHub |
| `git fetch` | Download changes without merging them |
| `git merge` | Bring fetched upstream changes into your branch |
| `git pull` | Fetch and merge in one command |

`git init` starts a brand-new local repository. This exercise uses `git clone` because the shared practice repository already exists.
