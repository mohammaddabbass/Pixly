FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql\
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Enable Apache mod_rewrite 
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy Laravel app files into container
COPY . /var/www/html
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

COPY shell.sh /startup.sh

# Make the script executable
RUN chmod +x /startup.sh 

# Set permissions (Apache user must access app)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose Apache port
EXPOSE 80

RUN php artisan config:clear \
 && php artisan config:cache \
 && php artisan route:cache \
 && php artisan view:cache || true

# Starts the server
# CMD ["apache2-foreground"]
