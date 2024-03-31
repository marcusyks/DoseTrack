# !/bin/bash

python3.9 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Starts celery
celery -A core worker -l INFO --beat