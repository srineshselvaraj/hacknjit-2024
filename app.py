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

if __name__ == '__main__':
    app.run(debug=True)