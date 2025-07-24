import os
import numpy as np
import random
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import pandas as pd

# # נתיב לתיקייה הראשית (שבתוכה יש "male" ו-"female")
base_dir = "./Gender"
from PIL import Image


# # פונקציה להצגת תמונות
def plot_images(images, labels, sp=3):
    fig, axes = plt.subplots(sp, sp, figsize=(10, 10))
    fig.subplots_adjust(hspace=1, wspace=0.3)
    print(type(axes))  # אמור להחזיר: <class 'numpy.ndarray'>

    for ax, img_path, label in zip(axes.flatten(), images, labels):
        img = mpimg.imread(img_path)
        ax.imshow(img)
        ax.set_xlabel(f'Label: {label}', fontsize=12)
        ax.set_title(f'Label: {label}', fontsize=14)
        ax.axis("off")


#     plt.tight_layout()  # סידור תצוגה למניעת חיתוך טקסט
#     plt.show()


# # איסוף כל התמונות מהתיקיות
image_paths = []
image_labels = []

for category in ["male", "female"]:
    category_path = os.path.join(base_dir, category)
    for file in os.listdir(category_path):
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            image_paths.append(os.path.join(category_path, file))
            image_labels.append("male" if category == "male" else "female")

# לבחור תמונות רנדומליות
sp = 3  # מספר שורות ועמודות
num_images = min(sp * sp, len(image_paths))  # לוודא שאין יותר תמונות ממספר הקבצים
random_indices = np.random.choice(len(image_paths), num_images, replace=False)
selected_paths = [image_paths[i] for i in random_indices]
selected_labels = [image_labels[i] for i in random_indices]

# # קריאה לפונקציה להצגת התמונות
plot_images(selected_paths, selected_labels, sp)


from PIL import Image

# # שינוי גודל תמונה עם רקע לבן לשמירה על פרופורציות
# def resize_with_white_background(path_ori, path_dest):
#     img = Image.open(path_ori)
    
#     # שינוי גודל תוך שמירה על יחס גובה-רוחב
#     img.thumbnail((224, 224), Image.LANCZOS)
    
#     # יצירת תמונה חדשה עם רקע לבן
#     background = Image.new('RGB', (224, 224), (255, 255, 255))
#     img_w, img_h = img.size
#     offset = ((224 - img_w) // 2, (224 - img_h) // 2)
#     background.paste(img, offset)
    
#     # שמירת הקובץ בתקיית היעד
#     background.save(os.path.join("resized", path_dest))

from tqdm import tqdm



# # ריצה על כל התמונות בתיקייה ושינוי גודלן
# for img_path in tqdm(image_paths, desc="Resizing Images"):
#     img_name = os.path.basename(img_path)  # חילוץ שם הקובץ
#     resize_with_white_background(img_path, img_name)

# plot the same images after the resize step
# and from the 'resized' folder
# נתיב לתיקייה שבה כל התמונות מעורבבות
resized_dir = "./resized"

# איסוף כל התמונות מהתיקייה המעורבת
image_paths_resized = []
image_labels_resized  = []

for file in os.listdir(resized_dir):
    if file.lower().endswith((".jpg", ".jpeg", ".png")):
        # זיהוי מגדר מתוך שם הקובץ
        label = "male" if file.startswith("1") else "female"
        image_paths_resized .append(os.path.join(resized_dir, file))
        image_labels_resized .append(label)

# לבחור 9 תמונות רנדומליות
sp = 3  # 3x3 תמונות
num_images = min(sp * sp, len(image_paths_resized ))  # לוודא שאין יותר מ-9 תמונות
random_indices = np.random.choice(len(image_paths_resized ), num_images, replace=False)
selected_paths = [image_paths_resized [i] for i in random_indices]
selected_labels = [image_labels_resized [i] for i in random_indices]

# פונקציה להצגת תמונות
def plot_images_resized(images, labels, sp=3):
    fig, axes = plt.subplots(sp, sp, figsize=(10, 10))
    fig.subplots_adjust(hspace=1, wspace=0.3)

    for ax, img_path, label in zip(axes.flatten(), images, labels):
        img = mpimg.imread(img_path)
        ax.imshow(img)
        ax.set_xlabel(f'Label: {label}', fontsize=12)
        ax.set_title(f'Label: {label}', fontsize=14)
        ax.axis("off")  # להסיר את הצירים

    plt.tight_layout()
    plt.show()

# קריאה לפונקציה להצגת התמונות
plot_images_resized(selected_paths, selected_labels, sp)

# confirm the size of the resized images
im = Image.open(image_paths_resized[0])
resized_size = im.size
print(resized_size)

import os

# נתיב לתיקייה שבה כל התמונות מעורבבות
resized_dir = "./resized"

# משתנים לאחסון הנתיבים לפי מגדר
male_images = []
female_images = []

# מעבר על כל הקבצים בתיקייה
for file in os.listdir(resized_dir):
    if file.lower().endswith((".jpg", ".jpeg", ".png")):
        file_path = os.path.join(resized_dir, file)

        # סיווג לפי תחילת שם הקובץ
        if file.startswith("1"):
            male_images.append(file_path)  # זכר
        elif file.startswith("0"):
            female_images.append(file_path)  # נקבה

# הדפסת מספר הקבצים בכל קבוצה
print(f"מספר תמונות זכרים: {len(male_images)}")
print(f"מספר תמונות נקבות: {len(female_images)}")

# split to train, validate and test folders with the help of sklearn
# each split is to 2 groups
# so we need 2 splits in order to split to 3 groups
from sklearn.model_selection import train_test_split

# the first split is to female_test and the rest of the images
female_train_valid, female_test = train_test_split(female_images, test_size=0.1, random_state=1)

# how many female in the test set?
print(f"female_test: {len(female_test)}")

# the second split on the female_train_valid folder separates to 2 folders: train and valid
female_train, female_valid = train_test_split(female_train_valid, test_size=0.2, random_state=1)

# how many female in the train and valid?
print(f"female_train: {len(female_train)}")
print(f"female_valid: {len(female_valid)}")

# split the male dataset to the same ratio
male_train_valid, male_test = train_test_split(male_images, test_size=0.1, random_state=1)

male_train, male_valid = train_test_split(male_train_valid, test_size=0.2, random_state=1)
print(f"male_test: {len(male_test)}")
print(f"male_train: {len(male_train)}")
print(f"male_valid: {len(male_valid)}")


# everything that we did so far was splitting the pandas' dataframe
# in the following steps we'll create the actual dataset
# by copying the images into the dataset folders

#DataFrame נמיר את הרשימות ל   
import pandas as pd

female_train = pd.DataFrame(female_train, columns=['filename'])
female_test = pd.DataFrame(female_test, columns=['filename'])
female_valid = pd.DataFrame(female_valid, columns=['filename'])
male_train = pd.DataFrame(male_train, columns=['filename'])
male_test = pd.DataFrame(male_test, columns=['filename'])
male_valid = pd.DataFrame(male_valid, columns=['filename'])

import shutil

# create the dataset by distributing the images to 3 folders: train, validate, test
# each containing 2 subfolders: female and dogs
for item in female_train['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/train/female/' + os.path.basename(item)
  shutil.copy(source, dest)

for item in female_test['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/test/female/' + os.path.basename(item)
  shutil.copy(source, dest)

for item in female_valid['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/validate/female/' + os.path.basename(item)
  shutil.copy(source, dest)


for item in male_train['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/train/male/' + os.path.basename(item)
  shutil.copy(source, dest)

for item in male_test['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/test/male/' + os.path.basename(item)
  shutil.copy(source, dest)

for item in male_valid['filename']:
  source = os.path.join("resized", os.path.basename(item))
  dest= 'dataset/validate/male/' + os.path.basename(item)
  shutil.copy(source, dest)


# paths to the datasets
train_path = 'dataset/train/'
valid_path = 'dataset/validate/'
test_path  = 'dataset/test/'