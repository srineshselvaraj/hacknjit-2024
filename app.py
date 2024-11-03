from flask import Flask, render_template, request, jsonify
from llmusage import notes_handler
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

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
    usertext = request.json.get('usertext')
    questions = notes_handler(text=usertext, request="questions")
    return jsonify({'questions': questions})

if __name__ == '__main__':
    app.run(debug=True)