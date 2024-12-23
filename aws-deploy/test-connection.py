import warnings
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
USERNAME = os.getenv('username')
ELASTIC_PASSWORD = os.getenv('ELASTIC_PASSWORD')
HOST = os.getenv('host')


# Elasticsearch connection
es = Elasticsearch(
    HOST,
    http_auth=(USERNAME, ELASTIC_PASSWORD)
)

try:
    print(es.info())
except Exception as e:
    print(f"Error: {e}")