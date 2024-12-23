# Task 2 Setup

## Environment Setup
Navigate to the asr folder
```bash
cd asr
```

Download and unzip the files from this link: https://www.dropbox.com/scl/fi/i9yvfqpf7p8uye5o8k1sj/common_voice.zip?rlkey=lz3dtjuhekc3xw4jnoeoqy5yu&e=1&dl=0

The file structure should look like this:
```bash
asr
asr/common_voice
asr/common_voice/cv-valid-dev.csv
asr/common_voice//cv-valid-dev/cv-valid-dev/...mp3 files
```

Create and activate Python virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate
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
Execute the CV decoder script in another terminal:
```bash
cd asr
python cv-decode.py
```

Clean Up Docker when done:
```bash
docker stop asr-api
docker rm asr-api
```

When you're done, deactivate the virtual environment:
```bash
deactivate
```

# Task 3

Design.pdf in deployment-design folder

# Task 4

## Environment Setup
Navigate to the elastic-backend folder
```bash
cd elastic-backend
```

Create and activate Python virtual environment:
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate
```

## Install Required Packages
```bash
pip install elasticsearch pandas python-dotenv
```

## Docker Commands
Build and run the Docker container:
```bash
docker compose up -d
```

## Run index script
Execute the index script in another terminal:
```bash
cd elastic-backend
python cv-index.py
```

When you're done, deactivate the virtual environment:
```bash
deactivate
```

# Task 5

## Environment Setup
Navigate to the search-ui folder
```bash
cd search-ui
```

## Docker Commands
Build and run the Docker container:
```bash
docker compose up -d
```
navigate to http://localhost:3000/ in your browser to view local deployment of elastic search-ui

Clean Up Docker when done:
```bash
docker compose down
cd ../elastic-backend
docker compose down
```

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
