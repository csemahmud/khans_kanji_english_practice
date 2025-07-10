from PIL import Image
import os

folder_to_check = 'public/Kanji_Images'

valid_images = []
oversized_images = []

def get_image_info(image_path):
    size = os.path.getsize(image_path)
    with Image.open(image_path) as img:
        width, height = img.size
    return {
        'name': os.path.basename(image_path),
        'dimension': f"{width}x{height}",
        'size': size,
        'width': width,
        'height': height,
    }

def print_table(header, image_list):
    print(f"\n{header}")
    print(f"{'Image Name':<30} {'Dimension':<15} {'Size (bytes)':>12}")
    print("-" * 60)
    for img in image_list:
        print(f"{img['name']:<30} {img['dimension']:<15} {img['size']:>12}")
    print()

# Scan images
for root, dirs, files in os.walk(folder_to_check):
    for filename in files:
        if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            path = os.path.join(root, filename)
            try:
                info = get_image_info(path)
                if info['width'] > 500 or info['height'] > 500:
                    oversized_images.append(info)
                else:
                    valid_images.append(info)
            except Exception as e:
                print(f"⚠️ Failed to process {path}: {e}")

# ✅ Table for valid images
if valid_images:
    print_table("✅ Images within 500x500 limit:", valid_images)
else:
    print("\n✅ No images within 500x500 limit.\n")

# 🚨 Table for oversized images
if oversized_images:
    print_table(f"🚨 Total {len(oversized_images)} image(s) exceed 500x500 limit:", oversized_images)
else:
    print("\n✅ No image crosses 500x500 limit.\n")
