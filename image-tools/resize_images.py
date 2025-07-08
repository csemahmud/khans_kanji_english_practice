from PIL import Image
import os
import time

input_folder = 'original_images'  # Your source folder
output_folder = 'public/Kanji_Images'  # Output folder

os.makedirs(output_folder, exist_ok=True)

def needs_resize(input_path, output_path):
    """Return True if output does not exist or input is newer than output."""
    if not os.path.exists(output_path):
        return True
    return os.path.getmtime(input_path) > os.path.getmtime(output_path)

resized_files = []
skipped_files = []
failed_files = []

start_time = time.time()

log_path = os.path.join(os.path.dirname(__file__), 'resize_log.txt')
with open(log_path, 'a', encoding='utf-8') as log_file:
    for root, dirs, files in os.walk(input_folder):
        relative_path = os.path.relpath(root, input_folder)
        target_dir = os.path.join(output_folder, relative_path)
        os.makedirs(target_dir, exist_ok=True)

        for filename in files:
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                input_path = os.path.join(root, filename)
                output_path = os.path.join(target_dir, filename)

                if needs_resize(input_path, output_path):
                    try:
                        with Image.open(input_path) as img:
                            img.thumbnail((500, 500))
                            img.save(output_path, optimize=True, quality=75)
                        resized_files.append(output_path)
                        log_file.write(f"Resized: {output_path}\n")
                        print(f"Resized: {output_path}")
                    except Exception as e:
                        failed_files.append(input_path)
                        log_file.write(f"Error: {input_path} - {e}\n")
                        print(f"Error processing {input_path}: {e}")
                else:
                    skipped_files.append(output_path)
                    print(f"Skipped (up to date): {output_path}")

end_time = time.time()
elapsed = end_time - start_time

print(f"\n✅ Total resized: {len(resized_files)}")
print(f"⏭️  Skipped: {len(skipped_files)}")
print(f"❌ Failed: {len(failed_files)}")
print(f"⏱️  Time taken: {elapsed:.2f} seconds")
