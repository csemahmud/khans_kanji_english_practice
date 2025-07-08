# 🛠 image-tools

This folder contains utility scripts used for image preparation in the project.

## `resize_images.py`

A Python script to resize kanji images before adding them to the project.

### ✅ Features

- Resizes images to a maximum of 500×500 pixels (maintains aspect ratio).
- Only processes images that are new or have been updated since the last resize.
- Keeps the folder structure intact inside the output directory.
- Logs the files that were resized and skips up-to-date images.

---

### 🧰 Requirements

Python 3.10+ and [Pillow](https://python-pillow.org/).

You can use `conda` to create a clean environment for this tool:

```bash
conda create -n kanji-image-tools python=3.10
conda activate kanji-image-tools
conda install pillow
