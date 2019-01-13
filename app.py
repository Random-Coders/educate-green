# Imports

# Flask imports
from flask import Flask, render_template, request, make_response, redirect
from json import load, dump # parse and add json data
import urllib.request
import xml.etree.ElementTree as ET

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

@app.route("/agriculture", methods=['GET'])
def agriculture():
    return render_template('agriculture.html')

@app.route("/electricity", methods=['GET'])
def electricity():
    return render_template('electricity.html')

@app.route("/transportlocation/")
def transportlocation():
	lat1_ = request.args.get('lat1')
	lon1_ = request.args.get('lon1')
	lat2_ = request.args.get('lat2')
	lon2_ = request.args.get('lon2')
	print(lat1_, lon1_)
	r = urllib.request.urlopen(f'https://api.tomtom.com/routing/1/calculateRoute/{lat1_},{lon1_}:{lat2_},{lon2_}?key=9eA3U6IaQC3t12wT4NNgNmvdpWiGw9bn')
	r = r.read()

	root = ET.fromstring(r)
	print(root.tag)
	route_length_meters = int(root[2][0][0].text)
	pnds_carbon_released = round(route_length_meters / 37980.52 * 20, 2)
	return render_template('carbon_footprint.html', carbon=pnds_carbon_released)

# run app
app.run(
    #host='0.0.0.0', # host to view from outside the network
    port=5000, # assign to port 8080
    debug=True # Have debug pages show when there is an error
)
