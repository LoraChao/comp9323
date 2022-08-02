import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api


offer = api.namespace('offer', description='Authentication Service')

@offer.route('/post/organization', doc={"description": "post new offer"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class IndividualRegister(Resource):
    @offer.expect(offer_model)
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


@offer.route('/search/brief')
class SearchOffer(Resource):
    @offer.response(200, 'OK')
    @offer.response(400, 'Bad Request')
    @offer.response(404, 'Not Found')
    @offer.response(201, 'Created')
    @offer.expect(search_organizations_model)
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


@offer.route('/search/detail')
class SearchOffer(Resource):
    @offer.response(200, 'OK')
    @offer.response(400, 'Bad Request')
    @offer.response(404, 'Not Found')
    @offer.response(201, 'Created')
    @offer.expect(search_organizations_details_model)
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
        #     return output, 200

@offer.route('/delete')
class DeleteOffer(Resource):
    @offer.response(200, 'OK')
    @offer.response(400, 'Bad Request')
    @offer.response(404, 'Not Found')
    @offer.response(201, 'Created')
    @offer.expect(delete_offer_model)
    def delete(self):
        data = json.loads(request.get_data())
        OrganizationId = data['OrganizationId']
        OfferId= data['OfferId']

        offer_sql = f"SELECT * FROM Offer WHERE OrganizationId='{OrganizationId}' and OfferId = '{OfferId}';"  # database_info
        result_from_offer = sql_command(offer_sql)

        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            delete_sql = f"DELETE FROM Offer WHERE OrganizationId='{OrganizationId}' and OfferId = '{OfferId}';"
            sql_command(delete_sql)
            output = {
                "message": "true"
            }
            return output, 200

@offer.route('/preferoffer')
class SearchOffer(Resource):
    @offer.response(200, 'OK')
    @offer.response(400, 'Bad Request')
    @offer.response(404, 'Not Found')
    @offer.response(201, 'Created')
    @offer.expect(preferoffer_model)
    def get(self):
        data = json.loads(request.get_data())
        userId = data['userId']
        if userId == "":
            output = {
                "message": "false"
            }
            return output, 400

        offer_sql = f"SELECT * FROM individualpreferoffer WHERE IndividualId='{userId}';"  # database_info
        result_from_preferoffer = sql_command(offer_sql)

        if not result_from_preferoffer:
            output = {
                "message": "false"
            }
            return output, 400

        offerId_list = []
        for i in result_from_preferoffer:
            offerId_list.append(i[2])
        # output = {
        #     "message": "test",
        #     "list": offerId_list
        # }
        if len(offerId_list) == 1:
            offerId_1 = offerId_list[0]
            output_sql = f"SELECT OfferId, OrganizationId, CompanyName, Position, Icon FROM offer WHERE offerId ='{offerId_1}';"
            result_from_offer = sql_command(output_sql)
            output = {
                "message": "success",
                "offerId": offerId_1,
                "organizationId": result_from_offer[0][1],
                "companyname": result_from_offer[0][2],
                "position": result_from_offer[0][3],
                "Icon": result_from_offer[0][4],
            }
            return output, 200
        else:
            offerId_1 = offerId_list[0]
            offerId_2 = offerId_list[1]
            output_sql = f"SELECT OfferId, OrganizationId, CompanyName, Position, Icon FROM offer WHERE offerId IN {(offerId_1, offerId_2)};"
            # output = {
            #     "sql": output_sql
            # }
            # return output, 200
            result_from_offer = sql_command(output_sql)
            output = {
                "0": {
                    "message": "success",
                    "offerId": offerId_1,
                    "organizationId": result_from_offer[0][1],
                    "companyname": result_from_offer[0][2],
                    "position": result_from_offer[0][3],
                    "Icon": result_from_offer[0][4],
                     },
                "1": {
                    "message": "success",
                    "offerId": offerId_1,
                    "organizationId": result_from_offer[1][1],
                    "companyname": result_from_offer[1][2],
                    "position": result_from_offer[1][3],
                    "Icon": result_from_offer[1][4],
                }
            }
            return output, 200