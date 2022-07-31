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
        # data = json.loads(request.get_data())
        IndividualName = request.form['username']
        Password = request.form['password']
        # Preference = request.form['Preference']
        # Occupation = request.form['Occupation']
        if IndividualName == "" or Password == "":
            output = {
                "message": "false"
            }
            return output, 400
        else:
            sql = f"SELECT * FROM individual WHERE IndividualName='{IndividualName}';"
            if sql_command(sql):
                output = {
                    "message": "false"
                }
                return output, 403
            else:
                IndividualID = 0
                sql = "INSERT INTO individual VALUES ({},'{}', '{}';".format(IndividualID, IndividualName, Password)
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
        # data = json.loads(request.get_data())
        OrganizationName = request.form['username']
        Password = request.form['password']
        if OrganizationName == "" or Password == "":
            output = {
                "message": "false"
            }
            return output, 400
        else:
            sql = f"SELECT * FROM organization WHERE OrganizationName='{OrganizationName}';"
            if sql_command(sql):
                output = {
                    "message": "false"
                }
                return output, 403
            else:
                OrganizationID = 0
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
        Name = data['username']
        Password = data['password']
        # Name = request.form["Name"]
        # Password  = request.form["Password"]
        if Name == "" or Password == "":
            output = {
                "message": "false"
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
                "message": "false"
            }
            return output, 403

        if type_flag == 'individual':
            if Password == result_from_user[0][2]:
                output = {
                    "success": 1,
                    # "token": token,
                    "usergroup": 'individual',
                    "name": result_from_user[0][1],
                    "id": result_from_user[0][0]
                }
                return output, 200
            else:
                output = {
                    "message": "false"
                }
                return output, 403
        else:
            if Password == result_from_org[0][2]:
                # token = encode_token(Name, type_flag)
                output = {
                    "success": 1,
                    # "token": token,
                    "usergroup": type_flag,
                    "name": result_from_org[0][1],
                    "id": result_from_org[0][0]
                }
                return output, 200
            else:
                output = {
                    "message": "false"
                }
                return output, 403


@auth.route('/details/individual')
class Individual_details(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(login_model)
    def post(self):

        data = json.loads(request.get_data())
        userName = data['username']
        title = data['title_name']
        name = data['name_name']
        gender = data['gender_name']
        age = data['age_name']
        email = data['email_name']
        skill = data['skill_name']
        education = data['education_name']
        experience = data['experience_name']
        achievement = data['achievement_name']
        professional = data['professional_name']
        cv = data['cv_name']

        user_sql = f"SELECT IndividualID,IndividualName,Password FROM Individual WHERE IndividualName='{userName}';"  # database_info
        result_from_user = sql_command(user_sql)

        if result_from_user:
            type_flag = 'individual'
        else:
            output = {
                "message": " not signup as individual / organization"
            }
            return output, 403

        if type_flag == 'individual':
            sql = "UPDATE individual SET Title='{}',Name='{}',Gender='{}',Age='{}',Email='{}',Skill='{}',Education='{}',Experience='{}',Achievement='{}',Professional='{}',CV='{}' WHERE IndividualName = '{}';"\
                .format(title, name, gender, age, email, skill, education, experience, achievement, professional, cv, userName)
            sql_command(sql)
            output = {
                "message": "success"
            }
            return output, 200
        else:
            output = {
                "message": "fail"
            }
            return output, 403

@auth.route('/details/organization')
class Organization_details(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(login_model)
    def post(self):

        data = json.loads(request.get_data())
        userName = data['username']
        companyname = data['companyname_name']
        location = data['location_name']
        field = data['field_name']
        scale = data['scale_name']
        description = data['description_name']

        org_sql = f"SELECT OrganizationID FROM Organization WHERE OrganizationName='{userName}';"  # database_info
        result_from_user = sql_command(org_sql)

        if result_from_user:
            type_flag = 'organization'
        else:
            output = {
                "message": "false"
            }
            return output, 403

        if type_flag == 'organization':
            sql = "UPDATE organization SET Companyname='{}',Location='{}',Field='{}',Scale='{}',Description='{}' WHERE OrganizationName = '{}';"\
                .format(companyname, location, field, scale, description, userName)
            sql_command(sql)
            output = {
                "message": "success"
            }
            return output, 200
        else:
            output = {
                "message": "false"
            }
            return output, 403