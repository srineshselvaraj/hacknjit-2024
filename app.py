from flask import Flask, render_template, request, jsonify
from llmusage import notes_handler
from notereader import read_image_file, extract_text_from_pdf
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route('/')
def home():
    return render_template("index.html")

@app.route('/get-data', methods=["POST"])
def get_data():
    usertext = request.json.get('usertext')
    data = notes_handler(text=usertext, request="summary")
    return jsonify(data)

@app.route('/questions', methods=["GET", "POST"])
def questions():
    if request.method == "POST":
        usertext = request.json.get('usertext')
        questions = notes_handler(text=usertext, request="questions")
    elif request.method == "GET":
        questions = notes_handler(request="questions")
    return jsonify(questions)

@app.route('/upload', methods=["POST"])
def uploads():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == "":
        return jsonify({'error': 'No selected file'}), 400

    content_type = file.content_type
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
     
    if content_type.startswith('image/'):
        file.save(file_path)
        usertext = read_image_file(file_path)
        return jsonify(usertext)
    
    elif content_type == 'application/pdf':
        file.save(file_path)
        usertext = extract_text_from_pdf(file_path)
        return jsonify(usertext)

    else:
        return jsonify({'error': 'Unsupported file type'}), 400


if __name__ == '__main__':
    app.run(debug=True)