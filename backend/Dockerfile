# Use official Python runtime as base image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_APP=app.py \
    FLASK_ENV=production \
    PATH="$PATH:/usr/local/bin"

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g migrate-mongo && \
    mkdir -p data && \
    apt-get install -y --no-install-recommends gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .
COPY migrate-mongo-config.js .
COPY migrations ./migrations
COPY wait-for-it ./wait-for-it
COPY run-migrations.sh .

# Make sure scripts are executable
RUN chmod +x ./run-migrations.sh && \
    chmod +x ./wait-for-it/wait-for-it.sh

# Expose port 5000
EXPOSE 5000

# Start migrations + start Flask
CMD ["sh", "run-migrations.sh"]
