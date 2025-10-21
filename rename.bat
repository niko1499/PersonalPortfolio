@echo off
setlocal enabledelayedexpansion

set /a count=1
for %%f in (*.jpg) do (
    ren "%%f" "!count!.jpg"
    set /a count+=1
)

echo.
echo Renaming complete.
pause