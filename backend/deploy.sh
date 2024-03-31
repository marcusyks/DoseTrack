# !/bin/bash

npm run vercel-build



# Starts celery
celery -A core worker -l INFO --beat