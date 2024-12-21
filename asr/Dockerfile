# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy everything from the current directory to /app in the container
COPY . /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app will run on
EXPOSE 8001

# Define environment variables
ENV PYTHONUNBUFFERED=1

# Run both Python scripts in sequence using bash
CMD ["bash", "-c", "python asr/asr_api.py && python cv-decode.py"]