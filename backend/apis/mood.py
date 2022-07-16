import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

# define namespace
auth = api.namespace('mood', description='Authentication Service')

# auth api is for user registration and login

# route function
# individual user's sign up
@auth.route('/post', doc={"description": "post new offer"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class PostDairy(Resource):
    @auth.expect(post_dairy_model)
    @api.doc(description='post a new dairy to database')
    def post(self):
        data = json.loads(request.get_data())
        IndividualId = data['IndividualId']
        IndividualName = data['IndividualName']
        Date = data['Date']
        Content = data['Content']
        if IndividualId == "" or  "" or IndividualName == "" or Date == "":
            output = {
                "message": "You need to fill in the complete information"
            }
            return output, 400
        else:
            sql = "INSERT INTO mood VALUES ({}, '{}', '{}', '{}');".format(IndividualId, IndividualName, Date, Content)
            sql_command(sql)
            output = {
                "message": "Success Post",
                "IndividualName": IndividualName,
                "Date": Date
            }
            return output, 201


@auth.route('/search')
class SearchDairy(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(search_dairy_model)
    def post(self):
        data = json.loads(request.get_data())
        IndividualId = data['IndividualId']
        IndividualName = data['Name']
        Date = data['Date']
        if IndividualId == "" or Date == "":
            output = {
                "message": "Missing name or password"
            }
            return output, 400
        
        dairy_sql = f"SELECT IndividualId, IndividualName, Date, Content FROM mood WHERE IndividualId='{IndividualId}'';" #database_info
        result_from_dairy = sql_command(dairy_sql)
       
        if not result_from_dairy:
            output = {
                "message": "Offer not post"
            }
            return output, 403

        if Date == result_from_dairy[0][2]:
            output = {
                "message": "success",
                "IndividualId": result_from_dairy[0][0],
                "IndividualName": result_from_dairy[0][1],
                "Date": result_from_dairy[0][2],
                "Content": result_from_dairy[0][3]
            }
            return output, 200
        else:
            output = {
                "message": "Dairy not post"
            }
            return output, 403