from flask import Flask
from flask_restx import Api
from flask_cors import CORS
# this is for server configuration

app = Flask(__name__)
app.config['ERROR_404_HELP'] = False
CORS(app)
api = Api(
    app,
    version='1.0',
    title='Wellbeing',
    description='Apis for Wellbeing backend server from COMP9323'
)