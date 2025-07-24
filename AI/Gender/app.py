from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from torchvision import transforms
from PIL import Image
import io
#%%
from PIL import Image
import torch
from torchvision import transforms, models
import torch.nn as nn

app = Flask(__name__)
CORS(app)
# טען את המודל
model = models.resnet18(pretrained=False)
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 128),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(128, 1)
)
model.load_state_dict(torch.load("my_model.pt", map_location=torch.device('cpu')))
model.eval()

# עיבוד תמונה כמו שהתאמנת עליו
# השתמשי ב-transform של התמונות ב-validation/test
val_test_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

@app.route('/predict-gender', methods=['POST'])
def predict_gender():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    image_bytes = image_file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')

    # טען ועבד את התמונה
    # שינוי גודל תוך שמירה על יחס גובה-רוחב
    image.thumbnail((224, 224), Image.LANCZOS)

    # יצירת תמונה חדשה עם רקע לבן
    background = Image.new('RGB', (224, 224), (255, 255, 255))
    img_w, img_h = image.size
    offset = ((224 - img_w) // 2, (224 - img_h) // 2)
    background.paste(image, offset)
    image = val_test_transforms(background)
    image = image.unsqueeze(0)  # הוספת מימד batch

    # חיזוי
    with torch.no_grad():
        output = model(image)
        prob = torch.sigmoid(output).item()
        pred = 1 if prob > 0.5 else 0
        label = "male" if pred == 1 else "female"
        print(f"Prediction: {label} (probability: {prob:.4f})")

        return jsonify({'gender': label})

if __name__ == '__main__':
    app.run(debug=True, port=5000)