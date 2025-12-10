import kagglehub

# Download latest version
path = kagglehub.dataset_download("nltkdata/timitcorpus")

print("Path to dataset files:", path)