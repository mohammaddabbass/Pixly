#!/bin/bash

echo "Running Laravel setup..."

composer install || echo "Composer failed but continuing..."
php artisan migrate || echo "Migration failed but continuing..."

# php artisan passport:install
php artisan passport:client --personal

echo "Start Apache ..."
# Start Apache regardless
exec apache2-foreground