@echo off
REM ============================================================
REM  PULSE / CIC_NEW - One-click push to GitHub
REM  Double-click this file after any change to upload to GitHub.
REM ============================================================
cd /d "%~dp0"

echo.
echo Saving and uploading your changes to GitHub...
echo.

git add .
git commit -m "Update %date% %time%"
git push

echo.
echo ============================================================
echo  Done. Your GitHub repo is now up to date.
echo  (If you see an error above, copy it and send it to Claude.)
echo ============================================================
echo.
pause
