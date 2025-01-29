cd ./apps/asp-backend
found=$(docker ps --filter "name=ets-zemun" --format "{{.Names}}" | grep -Evi container | wc -l)

if [ $found -gt 0 ]; then
    dotnet ef database update
else
    docker-compose up --build -d
    dotnet ef database update
    source ../../scripts/run-stop.sh
fi
