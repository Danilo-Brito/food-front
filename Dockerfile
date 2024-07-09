# Use a small, Alpine-based Nginx image
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy all static files to the appropriate directory in the container
COPY . /usr/share/nginx/html/

# Expose port 80 to allow outside access to the container
EXPOSE 80
