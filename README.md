# Git & GitHub Hands-on Lab

An individual online exercise by the AI Club at G.H. Raisoni University, Saikheda.

You will create a file about yourself, save changes in commits, undo one commit, and send a pull request (PR). Use **Git Bash** for the commands. Keep the same terminal open throughout.

Your file will be **public**. Share only details you are comfortable making public; do not add a phone number, personal email, or address.

## Before you begin

Create a [GitHub account](https://github.com/signup) and [install Git](https://git-scm.com/downloads) if you have not already. Check Git with `git --version`.

| Word | Meaning |
| --- | --- |
| Fork | Your copy of this online repository |
| Clone | Download your fork to your computer |
| Branch | A separate line of work |
| Commit | A saved checkpoint |
| Revert | A new commit that undoes an earlier commit |
| Push | Upload your commits to GitHub |
| Pull request (PR) | Ask to add your work to the original repository |

## 1. Star, fork, and clone

1. Open [KEYUR141/Git-Github-Lab](https://github.com/KEYUR141/Git-Github-Lab). Click **Star**, then **Fork**.
2. In Git Bash, replace `your-github-username` with your own GitHub username (not your full name):

```bash
GITHUB_USERNAME="your-github-username"
git clone "https://github.com/${GITHUB_USERNAME}/Git-Github-Lab.git"
cd Git-Github-Lab
git config --local user.name "Your Full Name"
git config --local user.email "your-github-email@example.com"
git remote -v
```

Use an email connected to your GitHub account. `git remote -v` should show **your fork**, not `KEYUR141`.

## 2. Create your branch

Your username gives you a unique branch and file, so you do not need a team name or PC number. Keep the same Git Bash window open so `GITHUB_USERNAME` stays set.

```bash
git switch main
git pull --ff-only origin main
git switch -c "developer/${GITHUB_USERNAME}"
git branch --show-current
```

The last command should show `developer/your-github-username` with your actual username.

## Task 1: Create your file

Create `developers/your-github-username.md` in a text editor. For now, put **only this heading** in it, using your actual full name:

```md
# Developer: Your Full Name
```

Save it, then run:

```bash
git status
git add "developers/${GITHUB_USERNAME}.md"
git diff --staged
git commit -m "lab: create developer file"
git log --oneline -1
```

`git add` stages the file; `git diff --staged` shows what the commit will save.

## Task 2: Edit and commit

Add a `Name:` line to the same file:

```md
# Developer: Your Full Name

Name: Your Full Name
```

Save it, then run:

```bash
git diff
git add "developers/${GITHUB_USERNAME}.md"
git commit -m "lab: add name"
git log --oneline -2
```

`git diff` shows your unstaged edits; `git log` shows your saved commits.

## Task 3: Revert that edit

```bash
git revert HEAD --no-edit
git log --oneline -3
```

Your file should contain **only the heading again**. The old commit remains in history; the revert adds a new commit that cancels its change.

## Task 4: Add your final details

Fill in the same file with your own information. Here, **Branch** means your academic branch/specialization, not the Git branch.

```md
# Developer: Your Full Name

Name: Your Full Name
Department: Your Department
Year: Your Year
Branch: Your Academic Branch
Interests or hobbies: Your Interests or Hobbies
```

Save it, then run:

```bash
git diff
git add "developers/${GITHUB_USERNAME}.md"
git commit -m "lab: add final details"
git log --oneline -4
```

You should see four lab commits: create, add name, revert, and final details.

## Task 5: Push and open a PR

```bash
git push -u origin "developer/${GITHUB_USERNAME}"
```

Open your fork on GitHub. Click **Contribute → Open pull request** (or **Compare & pull request**). Check that the **base** is `KEYUR141/Git-Github-Lab:main` and the **head** is your fork's `developer/your-github-username` branch. Title it `Add developer profile: your-github-username`, then create the PR. The automatic check will report whether the tasks are complete.

If another PR was merged while you worked, you can sync the original repository before pushing again:

```bash
git remote add upstream https://github.com/KEYUR141/Git-Github-Lab.git
git fetch upstream
git merge upstream/main
git push
```

## Command reminder

| Command | What it does |
| --- | --- |
| `git --version` | Check Git is installed |
| `git clone` | Download your fork |
| `git config --local` | Set the name and email recorded on your commits |
| `git remote -v` | Show connected online repositories |
| `git switch` | Change or create a branch |
| `git pull --ff-only` | Update your local `main` |
| `git branch --show-current` | Show your current branch |
| `git status` | Show changed and staged files |
| `git diff` / `git diff --staged` | Preview edits before and after staging |
| `git add` | Stage a file |
| `git commit` | Save a checkpoint |
| `git log --oneline` | View commit history |
| `git revert` | Undo a commit without deleting history |
| `git push` | Upload your branch |

`git init` creates a brand-new repository. Here you use `git clone` because the lab repository already exists.
