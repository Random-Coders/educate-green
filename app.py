# Imports

# Flask imports
from flask import Flask, render_template, request, make_response, redirect
from json import load, dump # parse and add json data

# Import os
import os

# Import config
import config

# Flask app
app = Flask(__name__)

# Add configs
app.config['SECRET_KEY'] = str(os.urandom(64))

# Views
@app.route("/", methods=['GET'])
def index():
    return render_template('flask_index.html')

@app.route("/transportation", methods=['GET'])
def transportation():
    return render_template('transportation.html')

@app.route("/food", methods=['GET'])
def food():
    return render_template('food.html')

# run app
app.run(
    #host='0.0.0.0', # host to view from outside the network
    port=5000, # assign to port 8080
    debug=True # Have debug pages show when there is an error
)
