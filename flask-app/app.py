
# < ======================================================================================================
# < Imports
# < ======================================================================================================

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

# < ======================================================================================================
# < Initialisation
# < ======================================================================================================

load_dotenv()
app = Flask(__name__)
CORS(app)

# ! Access database.db within the instance folder
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///database.db")

# ! Access database.db within the root folder of the app
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define a simple model
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    age = db.Column(db.Integer, nullable = False)

# < ======================================================================================================
# < Flask App Routes
# < ======================================================================================================

@app.route('/')
def hello_world():
    """Route to test the base URL"""
    return "Hello, World!"

@app.route('/users', methods = ["GET"])
def get_users():
    """Route to query the database and return users in json format"""
    users = User.query.all()
    users_data = [{"id": user.id, "name": user.name, "email": user.email, "age": user.age} for user in users]
    return jsonify(users_data)

# < ======================================================================================================
# < Execution
# < ======================================================================================================

if __name__ == "__main__":
    app.run(debug = True)
