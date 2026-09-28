# Git & GitHub Lab

A hands-on Git and GitHub exercise from the AI Club at G.H. Raisoni University, Saikheda. Work in pairs: one computer, one team file, and one pull request (PR) per pair.

**Goal:** Make a change, save it in commits, undo one commit without deleting history, and propose the finished work through a PR.

## Before the lab

- Both students should have a GitHub account. Verify your email before the session.
- The lab computer needs Git and an editor such as VS Code or Notepad.
- Decide on a team name and note your computer number. Use a unique file name such as `teams/byte-builders-pc12.md`.
- Use Git Bash for the commands below. Replace every example team name and URL with your own.
- This is a public repository. The names and academic details you submit will be publicly visible.

## 1. Star, fork, and clone

1. Open **[KEYUR141/Git-Github-Lab](https://github.com/KEYUR141/Git-Github-Lab)** and click **Star**.
2. Click **Fork** and create a copy under one student's GitHub account. The second student should take turns at the keyboard and check each change.
3. On your fork, click **Code**, copy the HTTPS URL, and run:

```bash
git clone https://github.com/YOUR-USERNAME/Git-Github-Lab.git
cd Git-Github-Lab
git remote -v
git status
```

`origin` should point to **your fork**, not to Keyur's repository. If Git asks you to sign in when you push, use the browser sign-in flow. Do not put a password or access token in a file.

Set the commit identity for this repository. Use the email associated with the account that owns the fork, or its GitHub-provided no-reply email:

```bash
git config --local user.name "Your Name"
git config --local user.email "your-github-email@example.com"
git config --local --list
```

## 2. Make a branch

Bring your fork's `main` up to date and create a branch for your pair:

```bash
git switch main
git pull --ff-only origin main
git switch -c team/byte-builders-pc12
git branch --show-current
```

Keep your work on this branch. Do not commit directly to `main`.

## Task 1 — Create your team file

Create `teams/byte-builders-pc12.md` with **only** a heading at first:

```md
# Team: Byte Builders
```

Git tracks files, not empty folders, so create the `.md` file inside the existing `teams` folder. Inspect, stage, and commit it:

```bash
git status
git diff -- teams/byte-builders-pc12.md
git add teams/byte-builders-pc12.md
git diff --staged
git commit -m "lab: create team file"
git log --oneline -1
```

> `git diff` does not show an untracked file until it is staged. After `git add`, `git diff --staged` shows what the commit will contain.

## Task 2 — Add both names

Add these two lines under the heading, with your real names:

```md
Student 1 name: First Student
Student 2 name: Second Student
```

Then make a second commit:

```bash
git diff
git add teams/byte-builders-pc12.md
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
# Team: Byte Builders

Student 1 name: First Student
Student 1 department: Computer Science
Student 1 year: 2
Student 1 semester: 3

Student 2 name: Second Student
Student 2 department: Computer Science
Student 2 year: 2
Student 2 semester: 3
```

Check and commit the completed file:

```bash
git diff
git add teams/byte-builders-pc12.md
git commit -m "lab: add final details"
git log --oneline -4
git status
```

You should now see four commits from your pair: create, add names, revert, and final details.

## Task 5 — Push and open a pull request

```bash
git push -u origin team/byte-builders-pc12
git remote -v
```

On your fork's GitHub page, click **Contribute → Open pull request** (or **Compare & pull request**). Check that:

- **Base repository:** `KEYUR141/Git-Github-Lab`, branch `main`
- **Head repository:** your fork, branch `team/byte-builders-pc12`
- The PR changes **only your team's file**.

Give the PR a title such as `Add Byte Builders (PC 12)`. Submit it and wait for the lab checker. If GitHub asks the repository owner to approve the check for a first-time contributor, tell the instructor. Your PR is still submitted. The instructor or AI Club team will review and merge it; students do not need write access to the original repository.

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
