import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

# define namespace
auth = api.namespace('auth', description='Authentication Service')

# auth api is for user registration and login

# route function
# individual user's sign up
@auth.route('/signup/individual', doc={"description": "new individual user registration"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class IndividualRegister(Resource):
    @auth.expect(individual_model)
    @api.doc(description='Registration a new individual to database')
    def post(self):
        data = json.loads(request.get_data())
        IndividualName = data['IndividualName']
        Password = data['Password']
        Preference = data['Preference']
        Occupation = data['Occupation']
        if IndividualName == "" or Password == "" or Preference == "" or Occupation == "":
            output = {
                "message": "You need to fill in the complete information"
            }
            return output, 400
        else:
            sql = f"SELECT * FROM individual WHERE IndividualName='{IndividualName}';"
            if sql_command(sql):
                output = {
                    "message": "Name already used"
                }
                return output, 403
            else:
                IndividualID = 100
                sql = "INSERT INTO individual VALUES ({},'{}', '{}', '{}', '{}');".format(IndividualID, IndividualName, Password, Preference, Occupation)
                sql_command(sql)
                select_sql = f"SELECT IndividualID FROM Individual WHERE IndividualName='{IndividualName}';"
                IndividualID = sql_command(select_sql)[0][0]
                output = {
                    "message": "Success register",
                    "individualID": IndividualID,
                    "individualName": IndividualName
                }
                return output, 201

#organization user's sign up
@auth.route('/signup/organization', doc={"description": "new organization user registration"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class OrganizationRegister(Resource):
    @auth.expect(organization_model)
    def post(self):
        data = json.loads(request.get_data())
        OrganizationName = data['OrganizationName']
        Password = data['Password']
        if OrganizationName == "" or Password == "":
            output = {
                "Message": "You need to fill in the complete information"
            }
            return output, 400
        else:
            sql = f"SELECT * FROM organization WHERE OrganizationName='{OrganizationName}';"
            if sql_command(sql):
                output = {
                    "Message": "Name already used"
                }
                return output, 403
            else:
                OrganizationID = 101
                sql = "INSERT INTO organization VALUES ({},'{}','{}');".format(OrganizationID, OrganizationName, Password)
                sql_command(sql)
                select_sql = f"SELECT OrganizationID FROM organization WHERE OrganizationName='{OrganizationName}';"
                OrganizationID = sql_command(select_sql)[0][0]
                output = {
                    "Message": "Success register",
                    "OrganizationID": OrganizationID,
                    "OrganizationName": OrganizationName
                }
                return output, 201

@auth.route('/login')
class Login(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(login_model)
    def post(self):
        data = json.loads(request.get_data())
        Name = data['Name']
        Password = data['Password']
        if Name == "" or Password == "":
            output = {
                "message": "Missing name or password"
            }
            return output, 400
        
        user_sql = f"SELECT IndividualID,IndividualName,Password FROM Individual WHERE IndividualName='{Name}';" #database_info
        org_sql = f"SELECT OrganizationID,OrganizationName,Password FROM Organization WHERE OrganizationName='{Name}';"
        result_from_user = sql_command(user_sql)
        result_from_org = sql_command(org_sql)


        if result_from_user:
            type_flag = 'individual'
        elif result_from_org:
            type_flag = 'organization'
        else:
            output = {
                "message": "Preference not signup as individual / organization"
            }
            return output, 403

        if type_flag == 'individual':
            if Password == result_from_user[0][2]:
                # token = encode_token(Name, type_flag)
                output = {
                    "message": "success",
                    # "token": token,
                    "usergroup": 'individual',
                    "name": result_from_user[0][1],
                    "id": result_from_user[0][0]
                }
                return output, 200
            else:
                output = {
                    "message": "Wrong password"
                }
                return output, 403
        else:
            if Password == result_from_org[0][2]:
                # token = encode_token(Name, type_flag)
                output = {
                    "message": "success",
                    # "token": token,
                    "usergroup": type_flag,
                    "name": result_from_org[0][1],
                    "id": result_from_org[0][0]
                }
                return output, 200
            else:
                output = {
                    "message": "Wrong password"
                }
                return output, 403