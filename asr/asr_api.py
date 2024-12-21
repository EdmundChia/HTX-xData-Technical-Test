from flask import Flask, request, jsonify
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC
import torch
import librosa
import io
import os

# Initialize Flask app
app = Flask(__name__)

# Ping endpoint for health check
@app.route("/ping", methods=["GET"])
def ping():
    return "pong", 200

# ASR endpoint
@app.route("/asr", methods=["POST"])
def asr():

    # Get the uploaded file from the request
    file = request.files.get("file")
    
    if not file:
        return jsonify({"error": "No file uploaded"}), 400
    
    # Read the audio file into a byte stream
    audio_bytes = file.read()

    # Load the audio file into librosa (convert bytes to numpy array)
    audio_input, sr = librosa.load(io.BytesIO(audio_bytes), sr=16000)  # sr=16000 to match Wav2Vec2 model's expected sample rate

    # Tokenize the audio input
    input_values = processor(audio_input, return_tensors="pt", padding="longest", sampling_rate=16000).input_values  # Batch size 1
    
    # Retrieve logits from the model
    logits = model(input_values).logits
    
    # Take argmax and decode to get the transcription
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)[0]
    
    # Get the duration of the audio in seconds
    duration = librosa.get_duration(y=audio_input, sr=sr)

    # Return transcription and duration as JSON response
    return jsonify({
        "transcription": transcription,
        "duration": str(duration)  # Convert duration to string to match the required format
    }), 200
 
# Run the app
if __name__ == "__main__":
    processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-large-960h")
    model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-large-960h")
    app.run(debug=True, host="0.0.0.0", port=8001)