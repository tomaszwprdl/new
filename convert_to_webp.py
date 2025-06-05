import os
from PIL import Image

exts = ['.jpg', '.jpeg', '.png']
root = 'public'

for folder, _, files in os.walk(root):
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in exts:
            path = os.path.join(folder, f)
            try:
                img = Image.open(path).convert('RGB')
                out = os.path.splitext(path)[0] + '.webp'
                img.save(out, 'webp', quality=90)
                print(f'Converted: {path} -> {out}')
            except Exception as e:
                print(f'Failed to convert {path}: {e}') 