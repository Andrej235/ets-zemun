ps aux | grep vite | awk '{print $2}' | while read -r pid; do
    kill -9 "$pid"
done