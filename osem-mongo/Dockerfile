FROM mongo:3.2

COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
COPY set_mongodb_password.sh /set_mongodb_password.sh
RUN chmod +x /set_mongodb_password.sh