import os
import shutil

def restore_files():
    # Source directory (backup with source code)
    source_dir = r"D:\bardzo folder\projekty\nowrent 0243 — kopia"
    
    # Destination directory (current project)
    dest_dir = os.getcwd()
    
    print("Starting file restoration...")
    
    # Copy all files and directories from the source to the destination
    for item in os.listdir(source_dir):
        source_path = os.path.join(source_dir, item)
        dest_path = os.path.join(dest_dir, item)
        
        if os.path.isdir(source_path):
            if os.path.exists(dest_path):
                shutil.rmtree(dest_path)
            shutil.copytree(source_path, dest_path)
            print(f"Copied directory: {item}")
        else:
            shutil.copy2(source_path, dest_path)
            print(f"Copied file: {item}")
    
    print("\nRestoration completed!")
    print("Please run 'npm install' to install dependencies")

if __name__ == "__main__":
    restore_files() 