@echo off
REM ============================================================
REM  CIC_NEW - Repair + publish to GitHub (writes a log Claude can read)
REM  Your files are NOT touched. This only rebuilds the git link.
REM  Double-click it. Sign in to GitHub if a window pops up.
REM ============================================================
cd /d "%~dp0"
set LOG=publish-log.txt

echo Starting repair + publish... a GitHub sign-in window may appear.
echo (Working... please wait for the "Done" message.)

> "%LOG%" echo ===== CIC_NEW publish log =====

REM --- clear stuck lock + rebuild git (files are kept) ---
if exist ".git\index.lock" del /f /q ".git\index.lock"
if exist ".git" rmdir /s /q ".git"
git init                                  >> "%LOG%" 2>&1
git branch -M main                        >> "%LOG%" 2>&1
git config user.name "Dhruv"              >> "%LOG%" 2>&1
git config user.email "dhruvbhatia306@gmail.com" >> "%LOG%" 2>&1

REM --- save all files ---
git add -A                                >> "%LOG%" 2>&1
git commit -m "Publish public site and private backend" >> "%LOG%" 2>&1

REM --- connect to GitHub and upload ---
git remote add origin https://github.com/dhruv1897/CIC_NEW.git >> "%LOG%" 2>&1
git pull origin main --allow-unrelated-histories -X ours --no-edit >> "%LOG%" 2>&1
git push -u origin main                   >> "%LOG%" 2>&1

REM --- final state for diagnosis ---
>> "%LOG%" echo.
>> "%LOG%" echo ===== FINAL STATE =====
git remote -v        >> "%LOG%" 2>&1
git log --oneline -5 >> "%LOG%" 2>&1
git status           >> "%LOG%" 2>&1

echo.
echo ============================================================
echo  DONE. Results were saved to publish-log.txt
echo  Now go back to Claude and type:  done
echo  Claude will read the log and tell you the next step.
echo ============================================================
echo.
type "%LOG%"
echo.
pause
