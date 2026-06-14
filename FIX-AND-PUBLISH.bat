@echo off
REM ============================================================
REM  CIC_NEW - One-time repair + publish to GitHub
REM  Your files are NOT touched. This only rebuilds the git link.
REM  Double-click it once. Sign in to GitHub if a window pops up.
REM ============================================================
cd /d "%~dp0"

echo.
echo === Step 1/6: Clearing stuck lock (if any) ===
if exist ".git\index.lock" del /f /q ".git\index.lock"

echo === Step 2/6: Rebuilding git (files are kept) ===
if exist ".git" rmdir /s /q ".git"
git init
git branch -M main

echo === Step 3/6: Setting your identity ===
git config user.name "Dhruv"
git config user.email "dhruvbhatia306@gmail.com"

echo === Step 4/6: Saving all your files ===
git add -A
git commit -m "Add analytics dashboard and project files"

echo === Step 5/6: Connecting to GitHub ===
git remote add origin https://github.com/dhruv1897/CIC_NEW.git
git pull origin main --allow-unrelated-histories -X ours --no-edit

echo === Step 6/6: Uploading to GitHub ===
git push -u origin main

echo.
echo ============================================================
echo  FINISHED. Look just above for results:
echo   - No red "error" / "rejected" lines  =  SUCCESS
echo   - Now refresh your GitHub page; dashboard.html will be there.
echo  If you DO see a red error, copy everything and send it to me.
echo ============================================================
echo.
pause
