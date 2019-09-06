@echo off
 
if "%~1" == "" (
    cmd.exe /K cd /D "%~dp0"
) else if exist "%~1\" (
    cmd.exe /K cd /D "%~1"
) else (
    cmd.exe /K cd /D "%~dp1"
)