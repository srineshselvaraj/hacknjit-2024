from flask import Flask, render_template, request, jsonify
from llmusage import notes_summary, hello_world
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/get-data', methods=["POST"])
def get_data():
    usertext = request.json.get('usertext')
    data = hello_world(text=usertext)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)