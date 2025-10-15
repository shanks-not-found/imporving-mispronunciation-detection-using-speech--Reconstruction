import os
import librosa
import librosa.display
import matplotlib.pyplot as plt

# 🔹 Path to your dataset folder
plt.switch_backend('tkagg')

base_path = r"C:\Users\shash\OneDrive\Documents\GitHub\imporving-mispronunciation-detection-using-speech-reconstruction\datasetsound"

# 🔹 Find one example WAV file
example_file = None
for root, dirs, files in os.walk(base_path):
    for file in files:
        if file.endswith(".WAV") or file.endswith(".wav"):
            example_file = os.path.join(root, file)
            break
    if example_file:
        break

if not example_file:
    print("⚠️ No audio file found in the given folder. Check your dataset path.")
else:
    print("✅ Sample file found:", example_file)

    # 🔹 Load audio file
    audio, sr = librosa.load(example_file, sr=None)
    print(f"Sample Rate: {sr}")
    print(f"Audio Length: {len(audio)/sr:.2f} seconds")

    # 🔹 Plot waveform
    plt.figure(figsize=(10, 4))
    librosa.display.waveshow(audio, sr=sr)
    plt.title("TIMIT Sample Waveform")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude")
    plt.show()

    # 🔹 Optional: Plot spectrogram
    plt.figure(figsize=(10, 4))
    spec = librosa.feature.melspectrogram(y=audio, sr=sr)
    spec_db = librosa.power_to_db(spec, ref=np.max)
    librosa.display.specshow(spec_db, sr=sr, x_axis='time', y_axis='mel')
    plt.colorbar(format="%+2.0f dB")
    plt.title("Mel Spectrogram")
    plt.show()
