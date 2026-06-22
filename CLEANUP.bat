@echo off
REM ============================================================
REM  CIC_NEW - One-time cleanup of leftover duplicate files
REM  Removes old flat-layout copies so only the clean
REM  public (docs/) + private (private/) structure remains.
REM  Your private/ and docs/index.html are kept untouched.
REM ============================================================
cd /d "%~dp0"
set LOG=cleanup-log.txt

echo Cleaning up duplicate files and uploading... please wait.
> "%LOG%" echo ===== CIC_NEW cleanup log =====

REM --- remove resurrected old root-level copies ---
git rm -f  --ignore-unmatch index.html dashboard.html BACKEND-GUIDE.md   >> "%LOG%" 2>&1
git rm -rf --ignore-unmatch data                                         >> "%LOG%" 2>&1

REM --- remove private business docs that leaked into public docs/ ---
git rm -f  --ignore-unmatch docs/business-plan.md docs/launch-guide.md docs/project-handbook.md docs/sample-briefing-2026-06-11.md >> "%LOG%" 2>&1

REM --- commit + push ---
git add -A                                                               >> "%LOG%" 2>&1
git commit -m "Clean up duplicates: keep only public docs/ and private/" >> "%LOG%" 2>&1
git push                                                                 >> "%LOG%" 2>&1

>> "%LOG%" echo.
>> "%LOG%" echo ===== FILES NOW TRACKED =====
git ls-files >> "%LOG%" 2>&1
>> "%LOG%" echo.
>> "%LOG%" echo ===== STATUS =====
git status   >> "%LOG%" 2>&1

echo.
echo ============================================================
echo  DONE. Now go back to Claude and type:  cleaned
echo ============================================================
echo.
type "%LOG%"
echo.
pause
