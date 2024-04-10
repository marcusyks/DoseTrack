#!/bin/bash
CELERY_RUN_DIR="/var/run/celery"
CELERY_LOG_DIR="/var/log/celery"

mkdir -p "$CELERY_RUN_DIR" "$CELERY_LOG_DIR"
chown -R nobody:nogroup "$CELERY_RUN_DIR" "$CELERY_LOG_DIR"
celery -A core worker --loglevel=info --beat --pidfile="$CELERY_RUN_DIR/%n.pid" --logfile="$CELERY_LOG_DIR/%n%I.log"
