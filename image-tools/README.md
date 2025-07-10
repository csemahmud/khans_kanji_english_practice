# 🛠 image-tools

This folder contains utility scripts used for image preparation in the project.

---

## `resize_images.py`

A Python script to resize Kanji images before adding them to the project.

### ✅ Features

- Resizes images to a maximum of **500×500 pixels** (maintains aspect ratio).
- Only processes images that are **new or modified** since the last resize.
- Keeps the **folder structure** intact inside the output directory.
- Logs resized files and skips up-to-date ones.
- Saves resized images into the `public/Kanji_Images` folder.

---

## `check_images.py`

A Python script to check the dimensions and sizes of all images in the `public/Kanji_Images` folder.

### ✅ Features

- Lists all images where **both width and height are ≤ 500px**.
- Counts and lists all images where **either width or height exceeds 500px**.
- Displays image lists in a **clean table format**:

- Helpful for verifying whether all images are optimized.

---

### 🧰 Requirements

Python 3.10+ and [Pillow](https://python-pillow.org/).

You can use `conda` to create a clean environment for these tools:

```bash
conda create -n kanji-image-tools python=3.10
conda activate kanji-image-tools
conda install pillow
