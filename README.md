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

docker compose up -d 

<!-- docker cp elastic-backend-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./ca.crt -->

python cv-index.py

Task 5

cd ../search-ui

docker-compose up --build

navigate to http://localhost:3000/
