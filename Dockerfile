FROM nginx:1.19

COPY dist/* /usr/share/nginx/html

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

# users are not allowed to listen on priviliged ports
# RUN sed -i.bak 's/listen\(\s*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf
# RUN sed -i.bak 's/listen\(\s*\)\[::\]:80;/listen [::]:8080;/' /etc/nginx/conf.d/default.conf
EXPOSE 8080

# comment user directive as master process is run as user in OpenShift anyhow
#RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN addgroup nginx root
USER nginx