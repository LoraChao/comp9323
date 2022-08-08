import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

auth = api.namespace('auth', description='Authentication Service')
@auth.route('/signup/individual', doc={"description": "new individual user registration"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class IndividualRegister(Resource):
    @auth.expect(individual_model)
    @api.doc(description='Registration a new individual to database')
    def post(self):
        data = json.loads(request.get_data())
        IndividualName = data['username']
        Password = data['password']
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
                sql = "INSERT INTO individual (IndividualId, IndividualName, Password) VALUES ({},'{}', '{}');".format(IndividualID, IndividualName, Password)
                sql_command(sql)
                select_sql = f"SELECT IndividualID FROM Individual WHERE IndividualName='{IndividualName}';"
                IndividualID = sql_command(select_sql)[0][0]
                output = {
                    "message": "Success register",
                    "individualID": IndividualID,
                    "individualName": IndividualName
                }
                return output, 200

#organization user's sign up
@auth.route('/signup/organization', doc={"description": "new organization user registration"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class OrganizationRegister(Resource):
    @auth.expect(organization_model)
    def post(self):
        data = json.loads(request.get_data())
        OrganizationName = data['username']
        Password = data['password']
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
                sql = "INSERT INTO organization (OrganizationID, OrganizationName, Password) VALUES ({},'{}','{}');".format(OrganizationID, OrganizationName, Password)
                sql_command(sql)
                select_sql = f"SELECT OrganizationID FROM organization WHERE OrganizationName='{OrganizationName}';"
                OrganizationID = sql_command(select_sql)[0][0]
                output = {
                    "message": "Success register",
                    "OrganizationID": OrganizationID,
                    "OrganizationName": OrganizationName
                }
                return output, 200

@auth.route('/login', doc={'description': 'login'})
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
                    "id": result_from_user[0][0],
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
                    "id": result_from_org[0][0],
                }
                return output, 200
            else:
                output = {
                    "message": "false"
                }
                return output, 403


@auth.route('/details/individual', doc={'description': 'modify ind information'})
class Individual_details(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(post_individual_model)
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
        icon = data['icon_name']
        user_sql = f"SELECT IndividualID,IndividualName,Password FROM Individual WHERE IndividualId='{userName}';"  # database_info
        result_from_user = sql_command(user_sql)
        # print(data)
        if result_from_user:
            type_flag = 'individual'
        else:
            output = {
                "message": " not signup as individual / organization"
            }
            return output, 403
        # output = {
        #     "output": data
        # }
        # return output, 200
        if type_flag == 'individual':
            sql = "UPDATE individual SET Title='{}',Name='{}',Gender='{}',Age='{}',Email='{}',Skill='{}',Education='{}',Experience='{}',Achievement='{}',Professional='{}',CV='{}', Icon='{}' WHERE IndividualId = '{}';"\
                .format(title, name, gender, age, email, skill, education, experience, achievement, professional, cv, icon, userName)
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

@auth.route('/details/organization', doc={'description': 'modify org information'})
class Organization_details(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(post_organization_model)
    def post(self):

        data = json.loads(request.get_data())
        userName = data['username']
        companyname = data['companyname_name']
        location = data['location_name']
        field = data['field_name']
        scale = data['scale_name']
        description = data['description_name']
        icon = data['icon_name']

        org_sql = f"SELECT OrganizationID FROM Organization WHERE OrganizationId='{userName}';"  # database_info
        result_from_user = sql_command(org_sql)

        if result_from_user:
            type_flag = 'organization'
        else:
            output = {
                "message": "false"
            }
            return output, 403

        if type_flag == 'organization':
            sql = "UPDATE organization SET Companyname='{}',Location='{}',Field='{}',Scale='{}',Description='{}', Icon='{}' WHERE OrganizationId = '{}';"\
                .format(companyname, location, field, scale, description, icon, userName)
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

@auth.route('/brief/individual/<int:userId>', doc={'description': 'get ind information'})
class Individual_brief(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(brief_individual_model)
    def get(self, userId):
        # data = json.loads(request.get_data())
        # userId = data["userId"]
        ind_sql = f"SELECT IndividualName, Title, Name, Gender, Age, Email, Skill, Education, Experience, Achievement, Professional, CV, Icon FROM Individual WHERE IndividualId='{userId}';"
        result_sql = sql_command(ind_sql)

        if not result_sql:
            output = {
                "message": "false"
            }
            return output, 403
        else:
            output = {
                "message": "success",
                "IndividualName": result_sql[0][0],
                "Title":  result_sql[0][1],
                "Name":  result_sql[0][2],
                "Gender":  result_sql[0][3],
                "Age":  result_sql[0][4],
                "Email": result_sql[0][5],
                "Skill":  result_sql[0][6],
                "Education": result_sql[0][7],
                "Experience": result_sql[0][8],
                "Achievement":  result_sql[0][9],
                "Professional":  result_sql[0][10],
                "CV":  result_sql[0][11],
                "Icon": result_sql[0][12]
            }
            return output, 200

@auth.route('/brief/organization/<int:userId>', doc={'description': 'get org information'})
class organization_brief(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(brief_individual_model)
    def get(self, userId):
        # data = json.loads(request.get_data())
        # userId = data["userId"]
        org_sql = f"SELECT OrganizationName, Companyname, Location, Field, Scale, Description, Icon FROM organization WHERE OrganizationId='{userId}';"
        result_sql = sql_command(org_sql)

        if not result_sql:
            output = {
                "message": "false"
            }
            return output, 403
        else:
            output = {
                "message": "success",
                "OrganizationName": result_sql[0][0],
                "Companyname": result_sql[0][1],
                "Location": result_sql[0][2],
                "Field": result_sql[0][3],
                "Scale": result_sql[0][4],
                "Description": result_sql[0][5],
                "Icon": result_sql[0][6]
            }
            return output, 200



