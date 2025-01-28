FROM nginx:alpine

# Copy SSL certificates and keys
COPY /apps/nginx/ssl/example.crt /etc/nginx/ssl/example.crt
COPY /apps/nginx/ssl/example.key /etc/nginx/ssl/example.key

# Copy Nginx configuration
COPY /apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf