# Task 2: Setting Up and Running ASR API

This guide will help you set up the environment, install dependencies, build and run the Docker container, and execute the Python script for the ASR API.

## Step 1: Create a Python Environment

First, create and activate a Python 3.9 environment using either `venv` (Python's built-in virtual environment tool) or `conda` (for Conda environments).

### Using `venv` (Python's built-in virtual environment tool):

Run the following commands in your terminal:

```bash
# Create a virtual environment
python3.9 -m venv env

# Activate the virtual environment (Windows)
.\env\Scripts\activate

# Activate the virtual environment (macOS/Linux)
source env/bin/activate
\

# Using `conda` (Conda environment):
conda create --name asr-env python=3.9
conda activate asr-env

# Step 2: Install Required Packages
pip install flask transformers librosa requests torch pandas

# Step 3: Build the Docker Image
docker build -t asr-api .

# Step 4: Run the Docker Container
docker run --name asr-api -p 8001:8001 asr-api

# Step 5: Run the Python Script
python cv-decode.py

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
