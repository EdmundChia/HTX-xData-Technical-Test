# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app will run on
EXPOSE 8001

# Define environment variables
ENV PYTHONUNBUFFERED=1

# Run asr_api.py when the container launches
CMD ["python", "asr/asr_api.py"]