@echo off
setlocal
cd /d "%~dp0"
set "NITRO_PRESET=node-server"
if not exist node_modules call npm install
if errorlevel 1 exit /b 1
call npm run build
if errorlevel 1 exit /b 1
node .output/server/index.mjs
endlocal
