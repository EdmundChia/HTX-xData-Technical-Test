import os
import pandas as pd
import requests

# Paths
AUDIO_FOLDER = "common_voice/cv-valid-dev"  # Path to folder containing audio files
CSV_FILE = "common_voice/cv-valid-dev.csv"  # Path to the CSV file
API_URL = "http://localhost:8001/asr"  # Your ASR API endpoint

# Function to call the ASR API
def transcribe_audio(file_path):
    with open(file_path, "rb") as f:
        files = {"file": f}  # Send file as multipart/form-data
        response = requests.post(API_URL, files=files)
    
    if response.status_code == 200:
        result = response.json()
        return result.get("transcription", ""), result.get("duration", 0.0)  # Extract transcription and duration
    else:
        print(f"Error {response.status_code} for {file_path}")
        return "", 0.0

# Main function to transcribe audio, update CSV, and populate duration
def main():
    # Load CSV
    print("Loading CSV...")
    df = pd.read_csv(CSV_FILE)
    
    # Ensure required columns exist
    if "filename" not in df.columns:
        print("Error: CSV does not contain 'filename' column.")
        return

    transcriptions = []  # List to store transcriptions
    durations = []       # List to store audio durations
    
    # Iterate over each file and call the API
    for index, row in df.iterrows():
        audio_file = os.path.join(AUDIO_FOLDER, row["filename"])  # Full file path
        if os.path.isfile(audio_file):  # Ensure file exists
            print(f"Processing {audio_file}...")
            # Transcribe audio and get duration
            transcription, duration = transcribe_audio(audio_file)
            transcriptions.append(transcription)
            durations.append(duration)
        else:
            print(f"File not found: {audio_file}")
            transcriptions.append("")  # Empty transcription for missing files
            durations.append(0.0)      # Zero duration for missing files
    
    # Add new columns and save updated CSV
    df["generated_text"] = transcriptions
    df["duration"] = durations
    # output_csv = "common_voice/cv-valid-dev-updated.csv"
    df.to_csv(CSV_FILE, index=False)
    print(f"Updated CSV saved to {CSV_FILE}")

if __name__ == "__main__":
    main()
