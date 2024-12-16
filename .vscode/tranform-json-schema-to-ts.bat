@echo off
setlocal enabledelayedexpansion
set result=

for /f "tokens=*" %%i in ('quicktype --lang ts --src-lang schema src/assets/json-data/schemas/%1.json --just-types --prefer-const-values --prefer-unions --explicit-unions') do (
  set result=!result! %%i
)

set result=!result:~8!
set result=!result:export=!
set result=export default !result!

echo !result! > src/assets/json-data/ts-schemas/%1.ts
