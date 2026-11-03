@echo off
setlocal
cd /d "%~dp0"
title Five Months, One Universe
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Dependencies are not installed yet.
  echo Run npm install once while you have internet access.
  npm install
  if errorlevel 1 (
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)
echo.
echo Starting your anniversary website...
echo Keep this window open while you use the site.
echo Open the local URL shown below.
echo.
call npm run dev -- --host 127.0.0.1
pause
