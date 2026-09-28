# Git & GitHub Lab

Work in pairs: one computer, one team file, one pull request. You will save changes, undo a commit, and send your finished file to the AI Club repository.

Use **Git Bash** for the commands. Keep the same window open throughout the lab.

## A few words before you start

- **Repository (repo):** a project folder with its Git history.
- **Fork:** your own copy of an online repo.
- **Clone:** download your fork to this computer.
- **Branch:** a separate line of work, so you can edit without changing `main`.
- **Commit:** a saved version of your work.
- **Pull request (PR):** ask the repo owner to review and merge your branch.

Both students need GitHub accounts. One student will own the pair's fork; take turns at the keyboard. Your team file will be public, including the names and academic details you enter.

## 1. Star, fork, and clone

Open [KEYUR141/Git-Github-Lab](https://github.com/KEYUR141/Git-Github-Lab). Click **Star** to save the repo on GitHub, then **Fork** to make your own copy.

Replace the two values below:

- `your-github-username`: the GitHub account that owns the fork.
- `your-team-name-pc-number`: a unique lowercase name with your computer number, such as `byte-builders-pc12`. Use only letters, numbers, and hyphens.

```bash
GITHUB_USERNAME="your-github-username"
TEAM_SLUG="your-team-name-pc-number"
git clone "https://github.com/${GITHUB_USERNAME}/Git-Github-Lab.git"
cd Git-Github-Lab
git remote -v
```

`origin` in the last command should show **your fork**. Set the name and GitHub-linked email that will appear on your commits:

```bash
git config --local user.name "YOUR_FULL_NAME"
git config --local user.email "YOUR_GITHUB_EMAIL"
```

Replace both uppercase values. A GitHub no-reply email also works.

## 2. Create your branch

`pull` downloads and applies the latest changes. `switch -c` creates your team's branch and moves you onto it.

```bash
git switch main
git pull --ff-only origin main
git switch -c "team/${TEAM_SLUG}"
git branch --show-current
```

The last line should show `team/your-chosen-slug`. Do the next tasks on this branch.

## Task 1: Create and commit a file

In the `teams` folder, create `YOUR_TEAM_SLUG.md`. Use your actual slug for the filename. Put only this heading inside it, replacing `YOUR_TEAM_NAME` with your readable team name:

```md
# Team: YOUR_TEAM_NAME
```

`status` shows the new file. `add` stages it, and `commit` saves this first version.

```bash
git status
git add "teams/${TEAM_SLUG}.md"
git diff --staged
git commit -m "lab: create team file"
```

## Task 2: Add both names

Add these lines below the heading, replacing the names:

```md
Student 1 name: STUDENT_1_FULL_NAME
Student 2 name: STUDENT_2_FULL_NAME
```

`diff` shows what changed since the last commit. Save the names as a second commit:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git commit -m "lab: add names"
```

## Task 3: Revert that commit

`revert` makes a new commit that undoes the previous one. It keeps both commits in the history.

```bash
git revert HEAD --no-edit
git log --oneline -3
```

Open the file again. It should contain only the team heading.

## Task 4: Add the final details

Now add both students' details. Replace **every** uppercase value:

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

Review and save the final version:

```bash
git diff
git add "teams/${TEAM_SLUG}.md"
git commit -m "lab: add final details"
git log --oneline -4
git status
```

You should see four commits: create file, add names, revert names, add final details.

## Task 5: Push and open a PR

`push` uploads your branch to your fork on GitHub:

```bash
git push -u origin "team/${TEAM_SLUG}"
```

On your fork's GitHub page, click **Contribute → Open pull request**. Check the direction:

- **Into:** `KEYUR141/Git-Github-Lab`, branch `main`
- **From:** your fork, branch `team/YOUR_TEAM_SLUG`

Submit the PR. The checker will look for your file, four commits, revert, and final details. Ask the instructor if a check needs approval or shows an error. The AI Club team will review and merge the PR.

## If you finish early

`upstream` is a name for the original repo. `fetch` downloads its latest commits; `merge` brings them into your current branch.

```bash
git remote add upstream https://github.com/KEYUR141/Git-Github-Lab.git
git fetch upstream
git merge upstream/main
```

`Already up to date` means there is nothing new to merge. After the instructor has merged PRs, `git switch main` followed by `git pull upstream main` updates your local `main`.
