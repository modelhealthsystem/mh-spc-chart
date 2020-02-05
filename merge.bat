@echo off
ECHO SOURCE BRANCH IS %BUILD_SOURCEBRANCH%
SET sourceBranch=origin/%BUILD_SOURCEBRANCH:refs/heads/=%
ECHO GIT CHECKOUT MASTER
git checkout master
ECHO GIT STATUS
git status
ECHO GIT MERGE
git merge %sourceBranch% -m "CI Build Merge to Master [skip ci]"
ECHO GIT STATUS
git status
ECHO GIT ADD
git add .
ECHO GIT COMMIT
git commit -am "CI Build Merge to Master [skip ci]"
ECHO GIT PUSH
git push origin
ECHO GIT STATUS
git status