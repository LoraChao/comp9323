import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

# define namespace
auth = api.namespace('offer', description='Authentication Service')

# auth api is for user registration and login

# route function
# individual user's sign up
@auth.route('/post/organization', doc={"description": "post new offer"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class IndividualRegister(Resource):
    @auth.expect(offer_model)
    @api.doc(description='post a new offer to database')
    def post(self):
        data = json.loads(request.get_data())
        OrganizationId = data['OrganizationId']
        CompanyName = data['company_name']
        PositionName = data['position_name']
        WorkLocation = data['working_location_name']
        WorkHour = data['working_hour_name']
        Salary = data['salary_name']
        Responsibility = data['responsibility_name']
        Requirement = data['requirement_name']
        Contact = data['contact_name']
        if OrganizationId == "":
            output = {
                "message": "false"
            }
            return output, 400
        else:
            OfferId = 0
            sql = "INSERT INTO offer VALUES ({}, {}, '{}', '{}', '{}', '{}', '{}', '{}', '{}','{}');".\
                format(OfferId, OrganizationId, CompanyName, PositionName, WorkLocation, WorkHour, Salary, Responsibility, Requirement, Contact)
            sql_command(sql)
            output = {
                "message": "Success Post",
                "OfferID": OfferId,
                "OrganizationName": CompanyName,
                "OrganizaitonID": OrganizationId
            }
            return output, 200


@auth.route('/search/brief')
class SearchOffer(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(search_organizations_model)
    def get(self):
        data = json.loads(request.get_data())
        OrganizationId = data['OrganizationId']
        # OrganizationName = data['OrganizationName']
        if OrganizationId == "":
            output = {
                "message": "false"
            }
            return output, 400
        
        offer_sql = f"SELECT * FROM Offer WHERE OrganizationId='{OrganizationId}';" #database_info
        result_from_offer = sql_command(offer_sql)
       
        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        if len(result_from_offer) == 1:
            output = {
                0: {"offerId": result_from_offer[0][0],
                    "CompanyName": result_from_offer[0][2],
                    "Responsibility": result_from_offer[0][7]}
            }
            return output, 400
        else:
            output = {
                0: {"offerId": result_from_offer[0][0],
                    "CompanyName": result_from_offer[0][2],
                    "Responsibility": result_from_offer[0][7]},
                1: {"offerId": result_from_offer[1][0],
                    "CompanyName": result_from_offer[1][2],
                    "Responsibility": result_from_offer[1][7]}
            }
            return output, 400


@auth.route('/search/detail')
class SearchOffer(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(search_organizations_model)
    def get(self):
        data = json.loads(request.get_data())
        OrganizationId = data['OrganizationId']
        OfferId= data['OfferId']
        if OrganizationId == "" or OfferId == "":
            output = {
                "message": "false"
            }
            return output, 400

        offer_sql = f"SELECT * FROM Offer WHERE OrganizationId='{OrganizationId}' and OfferId = '{OfferId}';"  # database_info
        result_from_offer = sql_command(offer_sql)

        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            output = {
                "offerId": result_from_offer[0][0],
                "OrganizationId": result_from_offer[0][1],
                "CompanyName": result_from_offer[0][2],
                "Position": result_from_offer[0][3],
                "WorkingLocation": result_from_offer[0][4],
                "WorkingHour": result_from_offer[0][5],
                "Salary": result_from_offer[0][6],
                "Responsibility": result_from_offer[0][7],
                "Requirement": result_from_offer[0][8],
                "Contact": result_from_offer[0][9]
            }
            return output, 200
        # else:
        #     output = {
        #         0: {"offerId": result_from_offer[0][0],
        #             "OrganizationId": result_from_offer[0][1],
        #             "CompanyName": result_from_offer[0][2],
        #             "Position": result_from_offer[0][3],
        #             "WorkingLocation": result_from_offer[0][4],
        #             "WorkingHour": result_from_offer[0][5],
        #             "Salary": result_from_offer[0][6],
        #             "Responsibility": result_from_offer[0][7],
        #             "Requirement": result_from_offer[0][8],
        #             "Contact": result_from_offer[0][9]},
        #         1: {"offerId": result_from_offer[1][0],
        #             "OrganizationId": result_from_offer[1][1],
        #             "CompanyName": result_from_offer[1][2],
        #             "Position": result_from_offer[1][3],
        #             "WorkingLocation": result_from_offer[1][4],
        #             "WorkingHour": result_from_offer[1][5],
        #             "Salary": result_from_offer[1][6],
        #             "Responsibility": result_from_offer[1][7],
        #             "Requirement": result_from_offer[1][8],
        #             "Contact": result_from_offer[1][9]}
        #     }
            return output, 200
