@echo off
setlocal
cd /d "%~dp0"
echo.
echo  Five Months, One Universe - Offline Starter
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 20 or newer is required. Install it, then run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing project dependencies for the first run...
  call npm install
  if errorlevel 1 goto failed
)
echo Building the local site...
call npm run build
if errorlevel 1 goto failed
echo.
echo Starting the local site. Keep this window open.
echo Open http://localhost:3000 in your browser.
echo.
node .output/server/index.mjs
goto end
:failed
echo.
echo The site could not start. Read the error above.
pause
exit /b 1
:end
endlocal
