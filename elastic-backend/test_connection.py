import warnings
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
ELASTIC_PASSWORD = os.getenv('ELASTIC_PASSWORD')

# Elasticsearch connection
es = Elasticsearch(
    "https://localhost:9200",
    ca_certs="ca.crt",
    basic_auth=("elastic", ELASTIC_PASSWORD)
)

print(es.info())