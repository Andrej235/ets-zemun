#!/bin/bash

result=""

while IFS= read -r line; do
  result="$result $line"
done < <(quicktype --lang ts --src-lang schema apps/website/src/assets/json-data/schemas/$1.json --just-types --prefer-const-values --prefer-unions --explicit-unions)

result="${result:8}"
result="${result//export/}"
result="export default $result"

echo "$result" > apps/website/src/assets/json-data/ts-schemas/$1.ts
