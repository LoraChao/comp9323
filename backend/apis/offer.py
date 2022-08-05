import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api


offer = api.namespace('offer', description='Authentication Service')

@offer.route('/post/organization', methods=["POST"] ,doc={"description": "post new offer"})
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
        Icon = data['icon_name']
        if OrganizationId == "":
            output = {
                "message": "false"
            }
            return output, 400
        else:
            OfferId = 0
            sql = "INSERT INTO offer VALUES ({}, {}, '{}', '{}', '{}', '{}', '{}', '{}', '{}','{}','{}');".\
                format(OfferId, OrganizationId, CompanyName, PositionName, WorkLocation, WorkHour, Salary, Responsibility, Requirement, Contact, Icon)
            sql_command(sql)
            output = {
                "message": "Success Post",
                "OfferID": OfferId,
                "OrganizationName": CompanyName,
                "OrganizaitonID": OrganizationId
            }
            return output, 200


@offer.route('/search/brief/<int:OrganizationId>',doc={"description": "search offer"})
@api.response(200, 'OK')
@api.response(400, 'Bad Request')
@api.response(404, 'Not Found')
@api.response(201, 'Created')
class SearchOffer(Resource):
    # @offer.expect(search_organizations_model)
    @api.doc(description='search offer')
    def get(self, OrganizationId):
        # OrganizationName = data['OrganizationName']
        if OrganizationId == "":
            output = {
                "message": "false"
            }
            return output, 400
        label_name = ["offerId", "CompanyName", "Responsibility", "Requirement"]
        offer_sql = f"SELECT offerId, CompanyName, Responsibility, Requirement FROM Offer WHERE OrganizationId='{OrganizationId}';" #database_info
        result_from_offer = sql_command(offer_sql)
        # result_from_offer = sql_dicresult_with_decription(offer_sql)
        # test.extend(result_from_db)
        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            output_res = output_list(result_from_offer, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200


@offer.route('/search/detail/<int:OrganizationId>&<int:OfferId>')
class SearchOffer(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    # @offer.expect(search_organizations_details_model)
    def get(self, OrganizationId, OfferId):
        if OrganizationId == "" or OfferId == "":
            output = {
                "message": "false"
            }
            return output, 400

        offer_sql = f"SELECT * FROM Offer WHERE OrganizationId='{OrganizationId}' and OfferId = '{OfferId}';"
        result_from_offer = sql_command(offer_sql)
        label_name = ["OfferId", "OrganizationId", "CompanyName", "Position", "WorkingLocation", "Workinghours", "Salary", "Responsibility", "Requirement", "Contact", "Icon"]


        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            output_res = output_list(result_from_offer, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200

@offer.route('/delete')
class DeleteOffer(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
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
                "message": "success"
            }
            return output, 200

@offer.route('/get/preferoffer/<int:userId>')
class GetPreferOffer(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    # @offer.expect(preferoffer_model)
    def get(self, userId):
        # data = request.args.to_dict()
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

        output_sql = 'SELECT OfferId, OrganizationId, CompanyName, Requirement, Icon FROM offer WHERE offerId in(%s)' % ','.join(['%s'] * len(offerId_list))
        label_name = ["OfferId", "OrganizationId", "CompanyName", "Requirement", "Icon"]
        result_from_offer = search_list(output_sql, offerId_list)
        output_res = output_list(result_from_offer,label_name)

        output = {
            "message": "success",
            "output": output_res
        }
        return output, 200

@offer.route('/post/preferoffer')
class PostPreferOffer(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    @offer.expect(preferoffer_model)
    def post(self):
        data = json.loads(request.get_data())
        userId = data['userId']
        OfferId = data['OfferId']
        if userId == "":
            output = {
                "message": "false"
            }
            return output, 400

        offer_sql = f"SELECT Requirement FROM Offer WHERE OfferId='{OfferId}';"
        offer_sql_res = sql_command(offer_sql)

        if userId == "":
            output = {
                "message": "false"
            }
            return output, 400
        offer_sql_res = offer_sql_res[0][0]
        PerferId = 0
        sql = "INSERT INTO individualpreferoffer VALUES ({}, {}, {}, '{}');".format(PerferId, userId, OfferId, offer_sql_res)
        sql_command(sql)

        output = {
            "message": "success",
            "OfferId": OfferId,
            "individualId": userId
        }

        return output, 200

@offer.route('/delete/preferoffer')
class DeletePreOffer(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    @offer.expect(delete_preferoffer_model)
    def delete(self):
        data = json.loads(request.get_data())
        userId = data['userId']
        OfferId= data['OfferId']

        offer_sql = f"SELECT * FROM individualpreferoffer WHERE individualId='{userId}' and OfferId = '{OfferId}';"
        result_from_offer = sql_command(offer_sql)

        if not result_from_offer:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            delete_sql = f"DELETE FROM individualpreferoffer WHERE individualId='{userId}' and OfferId = '{OfferId}';"
            sql_command(delete_sql)
            output = {
                "message": "success"
            }
            return output, 200

@offer.route('/modify/organization', methods=["POST"] ,doc={"description": "modify offer"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class UpdateOffer(Resource):
    @offer.expect(update_offer_model)
    @api.doc(description='update offer')
    def post(self):
        data = json.loads(request.get_data())
        OfferId = data['OfferId']
        OrganizationId = data['OrganizationId']
        CompanyName = data['company_name']
        PositionName = data['position_name']
        WorkLocation = data['working_location_name']
        WorkHours = data['working_hour_name']
        Salary = data['salary_name']
        Responsibility = data['responsibility_name']
        Requirement = data['requirement_name']
        Contact = data['contact_name']
        Icon = data['icon_name']

        offer_sql = f"SELECT OfferId FROM Offer WHERE OfferId='{OfferId}';"
        offer_sql_res = sql_command(offer_sql)
        if not offer_sql_res:
            output = {
                "message": "false"
            }
            return output, 400
        else:
            sql = "UPDATE offer SET OrganizationId='{}',CompanyName='{}',Position='{}',WorkingLocation='{}',\
            WorkingHours='{}', Salary='{}', Responsibility='{}', Requirement='{}', Contact='{}', Icon='{}' WHERE OfferId = '{}';" \
                .format(OrganizationId, CompanyName, PositionName, WorkLocation, WorkHours, Salary, Responsibility, Requirement, Contact, Icon, OfferId)
            sql_command(sql)
            output = {
                "message": "Success Post",
                "OfferID": OfferId,
                "OrganizationName": CompanyName,
                "OrganizaitonID": OrganizationId
            }
            return output, 200
