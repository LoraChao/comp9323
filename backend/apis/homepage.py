import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api
import numpy as np

# define namespace
auth = api.namespace('homepage', description='Authentication Service')

# auth api is for user registration and login

# route function
# individual user's sign up
@auth.route('/randompost', doc={"description": "post new offer"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class PostDairy(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='post a new dairy to database')
    def post(self):
        dairy_sql = f"SELECT * FROM Inidivual'';"  # database_info IndividualID, IndividualName, Password, Preference, Occupation
        result_from_dairy = sql_command(dairy_sql)
        Id_list = result_from_dairy[0]
        length = len(Id_list)
        tmp = np.arange(length)
        np.random.shuffle(tmp)
        user1_id = tmp[0]
        user2_id = tmp[1]
        user3_id = tmp[2]
        output = {
            "message": "success",
            "1": user1_id,
            "2": user2_id,
            "3": user1_id
        }
        return output, 200