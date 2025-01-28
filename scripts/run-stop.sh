running=$(docker ps --filter "name=ets-zemun" --format "{{.Names}}" | grep -Evi container)
found=$(echo $running | wc -l)

if [ $found -gt 0 ]; then
    while read -r line; do
        docker stop $line
    done <<< $running
else
    echo "Container not running"
fi
