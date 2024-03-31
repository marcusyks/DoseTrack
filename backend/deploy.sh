# !/bin/bash

python3.9 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Test redis
sudo apt-get update
sudo apt install redis-server
redis-cli ping

# Starts celery
celery -A core worker -l INFO --beat