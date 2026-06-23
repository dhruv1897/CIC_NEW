@echo off
REM ============================================================
REM  PULSE / CIC_NEW - One-click publish to GitHub
REM  Pulls the latest (so n8n's news changes merge in), then
REM  uploads your local changes. Writes publish-log.txt for Claude.
REM ============================================================
cd /d "%~dp0"
set LOG=publish-log.txt

echo.
echo Publishing your changes to GitHub... (a sign-in window may appear)
echo.

> "%LOG%" echo ===== PUBLISH LOG =====
git add -A                              >> "%LOG%" 2>&1
git commit -m "Update site %date% %time%" >> "%LOG%" 2>&1
echo --- pulling latest (merges n8n news) --- >> "%LOG%"
git pull origin main --no-edit         >> "%LOG%" 2>&1
echo --- pushing --- >> "%LOG%"
git push origin main                   >> "%LOG%" 2>&1
>> "%LOG%" echo. & >> "%LOG%" echo ===== STATUS =====
git status                             >> "%LOG%" 2>&1
git log --oneline -5                   >> "%LOG%" 2>&1

echo.
echo ============================================================
echo  DONE. Results are in publish-log.txt
echo  Go back to Claude and type:  published
echo ============================================================
echo.
type "%LOG%"
echo.
pause
