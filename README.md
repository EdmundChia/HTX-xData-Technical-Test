# Task 2 Setup Instructions

## Environment Setup

Create and activate Python virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# For Windows
venv\Scripts\activate
# For macOS/Linux
source venv/bin/activate
```

## Install Required Packages
```bash
pip install flask transformers librosa requests torch pandas
```

## Docker Commands
Build the Docker image:
```bash
docker build -t asr-api .
```

Run the Docker container:
```bash
docker run --name asr-api -p 8001:8001 asr-api
```

## Run Decoder Script
Execute the CV decoder script:
```bash
python cv-decode.py
```

## Order of Operations
1. Set up virtual environment and install packages
2. Build Docker image
3. Run Docker container
4. Run decoder script

## Troubleshooting
- Ensure Docker daemon is running
- Verify port 8001 is not in use
- Check Python version compatibility (3.8+ recommended)

Task 2

cd asr

download and put common_voice folder with mp3s in here

asr 
-asr/common_voice
-asr/common_voice/cv-valid-dev.csv
-asr/common_voice/cv-valid-dev/cv-valid-dev/...mp3

docker build -t asr-api .

docker run --name asr-api -p 8001:8001 asr-api

install python and pandas if not installed

pip install pandas

python cv-decode.py

(after done, close and delete asr-api container to save CPU/RAM)

Task 3



Task 4

cd ../elastic-backend

install elastic search if not installed

python -m pip install elasticsearch

docker compose up -d 

<!-- docker cp elastic-backend-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./ca.crt -->

python cv-index.py

Task 5

cd ../search-ui

docker-compose up --build

navigate to http://localhost:3000/
