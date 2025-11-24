#!/bin/sh
set -e

echo "Waiting for MongoDB..."
./wait-for-it/wait-for-it.sh mongo:27017 -t 80

echo "Running MongoDB migrations..."
migrate-mongo up

echo "Starting Flask app..."
python app.py
