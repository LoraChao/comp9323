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
        OrganizationName = data['OrganizationName']
        Salary = data['Salary']
        Workinghours = data['Workinghours']
        Tag = data['Tag']
        if OrganizationId == "" or Salary == "" or Workinghours == "" or Tag == "":
            output = {
                "message": "You need to fill in the complete information"
            }
            return output, 400
        else:
            OfferId = 0
            sql = "INSERT INTO offer VALUES ({}, {}, '{}', '{}', '{}', '{}');".format(OfferId, OrganizationId, OrganizationName, Salary, Workinghours, Tag)
            sql_command(sql)
            select_sql = f"SELECT OrganizationName FROM organization WHERE OrganizationId='{OrganizationId}';"
            OrganizaitonName = sql_command(select_sql)[0][0]
            output = {
                "message": "Success Post",
                "OfferID": OfferId,
                "OrganizationName": OrganizaitonName,
                "OrganizaitonID": OrganizationId
            }
            return output, 201


@auth.route('/search/organization')
class SearchOffer(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    @auth.expect(search_organizations_model)
    def post(self):
        data = json.loads(request.get_data())
        OrganizationId = data['OrganizationId']
        OrganizationName = data['OrganizationName']
        if OrganizationId == "" or OrganizationName == "":
            output = {
                "message": "Missing name or password"
            }
            return output, 400
        
        offer_sql = f"SELECT OfferId, OrganizationId, Salary, Workinghours, Tag FROM Offer WHERE OfferId='{OrganizationName}';" #database_info
        result_from_offer = sql_command(offer_sql)
       
        if not result_from_offer:
            output = {
                "message": "Offer not post"
            }
            return output, 403

        if OrganizationId == result_from_offer[0][1]:
            output = {
                "message": "success",
                "OfferId": result_from_offer[0][0],
                "OrganizationId": OrganizationId,
                "OrganizationName": OrganizationName,
                "Salary" : result_from_offer[0][2],
                "Workinghour" : result_from_offer[0][3],
                "Tag" : result_from_offer[0][4]
            }
            return output, 200
        else:
            output = {
                "message": "Offer not post"
            }
            return output, 403


@auth.route('/search/organization')
class FollowOffer(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(follow_offer_model)
    def post(self):
        data = json.loads(request.get_data())
        OfferId = data['OfferId']
        if OfferId == "":
            output = {
                "message": "No offer"
            }
            return output, 400

        offer_sql = f"SELECT OfferId, OrganizationName, Salary, Workinghours, Tag FROM Offer WHERE OfferId='{OfferId}';"  # database_info
        result_from_offer = sql_command(offer_sql)

        if not result_from_offer:
            output = {
                "message": "Wrong OfferId"
            }
            return output, 403

        if OfferId == result_from_offer[0][1]:
            sql = "INSERT INTO follow_offer VALUES ({}, {}, '{}', '{}', '{}',);".format(OfferId, result_from_offer[1],
                                                                                      result_from_offer[2], result_from_offer[3],
                                                                                      result_from_offer[4])
            sql_command(sql)
        else:
            output = {
                "message": "Wrong OfferId"
            }
            return output, 403