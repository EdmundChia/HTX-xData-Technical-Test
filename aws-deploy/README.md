# Elasticsearch Indexing Project

This project involves indexing data into an Elasticsearch cluster from a CSV file. It uses Python and several dependencies including `elasticsearch`, `pandas`, and `python-dotenv`.

## Setup Instructions

Follow these steps to create and activate the environment, install the required dependencies, and run the indexing script.

### 1. Create and Activate a Python 3.9 Environment

#### Using `conda`:
If you're using `conda`, you can create a Python 3.9 environment with the following commands:

```bash
conda create -n myenv python=3.9
conda activate myenv

# Create virtual environment
python3.9 -m venv myenv
# Activate the environment (Windows)
myenv\Scripts\activate

pip install elasticsearch==7.10.0 pandas python-dotenv

pip install numpy==1.22.4

python cv-index.py