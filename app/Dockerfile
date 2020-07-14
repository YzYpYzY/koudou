FROM nginx
 RUN rm /etc/nginx/conf.d/default.conf
 RUN mkdir -p /var/www/html
 COPY dist/koudou/* /var/www/html/
 COPY nginx.conf /etc/nginx/
 VOLUME /var/log/nginx/log
