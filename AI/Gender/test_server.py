import requests

url = 'http://127.0.0.1:5000/predict-gender'
image_path = rf'Z:\קבוצה 3\python_AI\Gender\1(62).jpg'  # Replace with your image file path

with open(image_path, 'rb') as img:
    files = {'image': img}
    response = requests.post(url, files=files)

print(response.json())
