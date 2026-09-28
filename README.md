# Git & GitHub Hands-on Lab

A beginner-friendly exercise by the AI Club at G.H. Raisoni University, Saikheda.

---

### instructions & Setup
* Student will work in **pairs** on **one computer**.
* Both students need a **GitHub account**.
* Open **Git Bash** on your computer and keep the same terminal window open throughout the session.

## A few words before you start

Both students need GitHub accounts. One student will own the pair's fork; take turns at the keyboard. Your team file will be public, including the names and academic details you enter.

**Some Key Concepts**
* **Fork:** Copying the main project repository into your personal GitHub account.
* **Clone:** Downloading your copy (fork) from GitHub to your local computer.
* **Branch:** Creating a separate workspace so your main code remains safe.
* **Commit:** Saving a checkpoint of your local changes.
* **Push:** Uploading your local commits to your GitHub account.
* **Pull Request (PR):** Requesting the original repository owner to merge your work.

---

## 1. Star, fork, and clone

1. Go to the original repository: **[KEYUR141/Git-Github-Lab](https://github.com/KEYUR141/Git-Github-Lab)**
2. Click **Star** (top right), then click **Fork** to create a copy under Student 1's account.
3. Open **Git Bash** and run the following commands (replace `your-github-username` with your actual username):

```bash
# Replace 'your-github-username' with Student 1's account name
GITHUB_USERNAME="your-github-username"

# Choose a team slug (lowercase, hyphens only, with PC number, e.g., byte-builders-pc12)
TEAM_SLUG="your-team-name-pc-number"

# Clone your fork to the local machine
git clone "[https://github.com/$](https://github.com/$){GITHUB_USERNAME}/Git-Github-Lab.git"
cd Git-Github-Lab
```

1. Configure your Git identity (Use Student 1's GitHub credentials)
```bash
git config --local user.name "Your Full Name"
git config --local user.email "your-github-email@example.com"
```

**Sanity Check**: Run git remote -v. Ensure the output links to your personal GitHub username, not KEYUR141.


## 2. Create a Working Branch

Always keep your work off the main branch. Bring your local code up to date and create a new branch:

```bash
git switch main
git pull --ff-only origin main
git switch -c "team/${TEAM_SLUG}"
```

**Another Sanity Check**: Run git branch --show-current. It should output team/your-team-name-pc-number.

## Task 1 : Create and Commit Your Team File

Create a new file inside the existing teams/ directory named YOUR_TEAM_SLUG.md (e.g., teams/byte-builders-pc12.md).

1. Open your code editor (VS Code or Notepad) and put only a single header at the top of teams/YOUR_TEAM_SLUG.md:

```md
# Team: YOUR_TEAM_NAME
```

1. Save the file, then stage and commit it using Git Bash:

```bash
git status
git add "teams/${TEAM_SLUG}.md"
git diff --staged
git commit -m "lab: create team file"
git log --oneline -1
```

## Task 2: Add Student Names

1. Open teams/YOUR_TEAM_SLUG.md again and add both student names below the header:

```md
# Team: YOUR_TEAM_NAME

Student 1 name: STUDENT_1_FULL_NAME
Student 2 name: STUDENT_2_FULL_NAME
```

1. Save the file, review your changes, and make a second commit:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git commit -m "lab: add names"
git log --oneline -2
```

## Task 3: Revert the Names Commit

Now you will undo the second commit without wiping out your history using git revert.

Run the revert command:

```bash
git revert HEAD --no-edit
```
**Troubleshooting** (If a text editor opens (do not panic)):
If Git Bash opens a text editor (like Vim) displaying a message, type :wq and press Enter to save and exit.

Verify the revert:

```bash
git log --oneline -3
```
Open teams/YOUR_TEAM_SLUG.md in your editor. It should now be back to showing only the original # Team: YOUR_TEAM_NAME heading.

## Task 4: Add Final Details

1. Open teams/YOUR_TEAM_SLUG.md and add complete academic details for both team members:

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

1. Save the file, stage, and commit:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git commit -m "lab: add final details"
```
1. Confirm your 4 commits:

```bash
git log --oneline -4
```

You should see exactly four commit messages: create file, add names, revert commit, and add final details.

## Task 5 : Push Changes and open a pull request

1. Push your local branch up to your GitHub fork:

```bash
git push -u origin "team/${TEAM_SLUG}"
```

1. Go to your fork's page on GitHub in your web browser.

2. Click Contribute → Open pull request (or the green Compare & pull request button).

3. Verify the PR settings:

    i. Base repository: KEYUR141/Git-Github-Lab | Branch: main

    ii. Head repository: your-username/Git-Github-Lab | Branch: team/YOUR_TEAM_SLUG

4. Set the PR Title: Add YOUR_TEAM_NAME (PC YOUR_PC_NUMBER)

5. Click Create Pull Request.

## Optional: Sync Upstream Changes (If you were fast )

If other teams' PRs get merged into the main repository while you are working, sync your fork with the original repository:

```bash
# Add the original repo as an upstream remote
git remote add upstream [https://github.com/KEYUR141/Git-Github-Lab.git](https://github.com/KEYUR141/Git-Github-Lab.git)

# Fetch upstream commits and merge them
git fetch upstream
git merge upstream/main
```
## Command reminder

| Command | What you used it for |
| --- | --- |
| `git clone` | Download your fork to the lab computer |
| `git config --local` | Set the identity recorded on commits in this repository |
| `git remote -v` | See where fetches and pushes go |
| `git switch -c` | Create and enter your working branch |
| `git status` | Check changed, staged, or untracked files |
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


