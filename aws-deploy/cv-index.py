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

# Constants
INDEX_NAME = 'cv-transcriptions'
CV_FILEPATH = '../asr/common_voice/cv-valid-dev.csv'

def bulk_generator(df):
    for i, row in df.iterrows():
        doc = row.to_dict()
        doc = {k: v for k, v in doc.items() if pd.notna(v)}
        yield {
            "_index": INDEX_NAME,
            "_source": doc
        }

def index_documents():
    df = pd.read_csv(CV_FILEPATH)
    print(f"Read {len(df)} records from CSV")
    

    success, failed = bulk(es, bulk_generator(df), chunk_size=1000)
    print(f"Successfully indexed {success} documents")

if __name__ == "__main__":
    index_documents()