from flask import Flask, render_template, request, jsonify, render_template_string, redirect, url_for
from llmusage import notes_handler
from notereader import read_image_file, extract_text_from_pdf
from flask_cors import CORS
import os
import psycopg2
from psycopg2.extras import Json

app = Flask(__name__)

global logged_user_id
logged_user_id=0

try:
    connection = psycopg2.connect(
        database="cognition", 
        user="postgres", 
        password="ididntthinkofone", 
        host="localhost", 
        port="5432"
    )
    print("Connection to PostgreSQL was successful!")
except Exception as e:
    print(f"Error: {e}")
finally:
    if connection:
        print("I connected!")

CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/get-data', methods=["GET", "POST"])
def get_data():
    if request.method == "POST":
        usertext = request.json.get('usertext')
        data = notes_handler(text=usertext, request="summary", id=logged_user_id)
    if request.method == "GET":
        data = notes_handler(request="summary", id=logged_user_id)
    return jsonify({"summary":data})

@app.route('/questions', methods=["GET", "POST"])
def questions():
    if request.method == "POST":
        usertext = request.json.get('usertext')
        questions = notes_handler(text=usertext, request="questions", id=logged_user_id)
    elif request.method == "GET":
        questions = notes_handler(request="questions", id=logged_user_id)
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

@app.route('/flashcards', methods=["GET", "POST"])
def flashcards():
    print("hi")
    if request.method == "POST":
        usertext = request.json.get('usertext')
        flashcards = notes_handler(text=usertext, request="flashcards", id=logged_user_id)
    elif request.method == "GET":
        flashcards = notes_handler(request="flashcards", id=logged_user_id)
    return jsonify(flashcards)

def validated_user(connection, username, input_password):
    try:
        cursor = connection.cursor()
        select_query = "SELECT * FROM users WHERE username = %s;"
        cursor.execute(select_query, (username,))
        user = cursor.fetchone() 
        if user == None:
            print("There is no such user")
            return False
        password = user[2]
        print(f"ID: {user[0]}, Username: {user[1]}, Email: {user[3]}")
        if (password == input_password):
            print(f"ID: {user[0]}, Username: {user[1]}, Email: {user[3]}")
            return True
        else:
            print("Password is incorrect")
            return False
    except Exception as error:
        print("Error retrieving users:", error)
    finally:
        cursor.close()

def user_exists(connection, username):
    try:
        cursor = connection.cursor()
        select_query = "SELECT * FROM users WHERE username = %s;"
        cursor.execute(select_query, (username,))
        user = cursor.fetchone()
        if user != None:
            print("Username already exists")
            return True
        else:
            return False
    except Exception as error:
        print("Error retrieving users:", error)
    finally:
        cursor.close()

def insert_user(connection, username, password, email):
    try:
        cursor = connection.cursor()
        insert_query = """
        INSERT INTO users (username, password_hash, email)
        VALUES (%s, %s, %s)
        RETURNING user_id;
        """
        password_hash = password #Possibility for future encryption
        cursor.execute(insert_query, (username, password_hash, email))
        user_id = cursor.fetchone()[0]  # Retrieve the generated ID
        connection.commit()  # Commit the transaction
        print(f"User {username} inserted with ID: {user_id}")
        return user_id
    except Exception as error:
        print("Error inserting user:", error)
        connection.rollback()  # Rollback in case of error
    finally:
        cursor.close()

def insert_cache(connection, user_id):
    try:
        cursor = connection.cursor()
        insert_query = """
        INSERT INTO user_cache (user_id)
        VALUES (%s)
        RETURNING user_id;
        """
        cursor.execute(insert_query, (user_id))
    except Exception as error:
        print("Error inserting cache:", error)
        connection.rollback()  # Rollback in case of error
    finally:
        cursor.close()

@app.route("/login", methods=["GET", "POST"])
def login():
    message = ""
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        
        if validated_user(connection, username, password):
            try:
                cursor = connection.cursor()
                select_query = "SELECT user_id FROM users WHERE username = %s;"
                cursor.execute(select_query, (username,))
                user = cursor.fetchone() 
            except Exception as error:
                print("Error retrieving users:", error)
            finally:
                cursor.close()   
            #logged_user_id = user[0] 
            return jsonify({
            'success': True,
            'message': 'Login successful!',
            'user': {
                'username': username,
            }
            }), 200 
        # else:
        #     message = "Invalid username or password. Please try again."
    return jsonify({
        'success': False,
        'message': 'Invalid username or password.'
    }), 401  # HTTP 401 Unauthorized for login failure


@app.route("/register", methods=["GET", "POST"])
def register():
    message = ""
    if request.method == "POST":
        username = request.json.get('username')
        password = request.json.get('password')
        email = request.json.get("email")  # Retrieve email (optional)
        if user_exists(connection, username):
            message = "Username already taken. Please choose another."
        else:
            insert_user(connection, username, password, email)
            insert_cache(user_id)
            return redirect(url_for("login"))
        print(message)
    return message

if __name__ == '__main__':
    app.run(debug=True)