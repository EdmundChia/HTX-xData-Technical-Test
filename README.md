local use

cd asr

docker build -t asr-api.py

docker run -p 8001:8001 asr-api

docker run --name asr-api-container -p 8001:8001 asr-api

docker run --name asr-api -p 8001:8001 asr-api

cd ../elastic-backend

docker compose up -d 

docker cp elastic-backend-es01-1:/usr/share/elasticsearch/config/certs/ca/ca.crt ./ca.crt

python cv-index.py
