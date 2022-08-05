import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api
import numpy as np

# define namespace
home = api.namespace('homepage', description='Authentication Service')

@home.route('/preferJob_ind/<int:userId>')
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class GetJob_ind(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='get prefer job')
    def get(self, userId):
        if userId == 0:
            random_sql = f"SELECT OfferId FROM offer;"
            random_id = sql_command(random_sql)
            lenth = len(random_id)
            random_list = []
            random_list = np.arange(1,lenth+1)
            np.random.shuffle(random_list)
            random_list = list(random_list[0:3])

            select_str = 'select CompanyName,Position,Contact from offer where OfferId in (%s)' % ','.join(['%s'] * len(random_list))
            output_info = search_list(select_str, random_list)
            label_name = ["CompanyName", "Position", "Contact"]
            output_res = output_list(output_info, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
        else:
            skill_sql = f"SELECT Skill FROM individual WHERE IndividualId = '{userId}';"
            result_from_skill = sql_command(skill_sql)
            if not result_from_skill:
                output = {
                    "message": "fail"
                }
                return output, 400

            offer_sql = f"SELECT PreferID FROM individualpreferoffer WHERE IndividualId = '{userId}';"
            result_from_offer = sql_command(offer_sql)

            preferId_list = []
            for i in result_from_offer:
                preferId_list.append(i[0])

            skill = result_from_skill[0][0]
            skill_match_sql = f"SELECT OfferId FROM offer WHERE Requirement = '{skill}';"
            skill_match = sql_command(skill_match_sql)
            skill_match_list = []
            for i in skill_match:
                skill_match_list.append(i[0])
            rec_list = list(set(skill_match_list) - set(preferId_list))

            select_str = 'select CompanyName,Position,Contact from offer where OfferId in (%s)' % ','.join(['%s'] * len(rec_list))
            output_info = search_list(select_str, rec_list)
            label_name = ["CompanyName","Position","Contact"]
            output_res = output_list(output_info, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200

@home.route('/PostSentence')
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class GetSentencey(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='get sentence')
    def get(self):
        Id_list = []
        sentence_sql = f"SELECT SentenceID FROM sentence;"
        result_from_sentence = sql_command(sentence_sql)
        lenth = len(result_from_sentence)
        Id_list = np.arange(lenth)
        np.random.shuffle(Id_list)

        sentence_sql = f"SELECT Content FROM sentence where SentenceID = '{Id_list[0]}';"
        result_from_sentence = sql_command(sentence_sql)
        output= {
            "message": "success",
            "Content": result_from_sentence[0][0]
        }
        return output, 200

@home.route('/expert/<int:userId>')
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class GetExpert(Resource):
    @api.doc(description='get experts')
    def get(self, userId):
        if userId == 0:
            random_sql = f"SELECT ExpertsId FROM Experts;"
            random_id = sql_command(random_sql)
            lenth = len(random_id)
            random_list = []
            random_list = np.arange(1, lenth + 1)
            np.random.shuffle(random_list)
            random_list = list(random_list[0:3])

            select_str = 'select ExpertsName, Tag, Introduce, Email, Icon from Experts where ExpertsId in (%s)' % ','.join(
                ['%s'] * len(random_list))
            output_info = search_list(select_str, random_list)
            label_name = ["ExpertsName", "Tag", "Introduce", "Email", "Icon"]
            output_res = output_list(output_info, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
        else:
            skill_sql = f"SELECT Skill FROM individual WHERE IndividualId = '{userId}';"
            result_from_skill = sql_command(skill_sql)

            if not result_from_skill:
                output = {
                    "message": "fail"
                }
                return output, 400
            else:
                skill = result_from_skill[0][0]
                skill_match_sql = f"SELECT * FROM experts WHERE Tag = '{skill}';"
                skill_match = sql_command(skill_match_sql)
                label_name = ["ExpertsId", "ExpertsName", "Tag", "Introduce", "Email", "Icon"]
                output_res = output_list(skill_match, label_name)
                output = {
                    "message": "success",
                    "output": output_res
                }
                return output, 200

@home.route('/prefer_org/<int:userId>')
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class Getorg_ind(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='get prefer org')
    def get(self, userId):
        # data = json.loads(request.get_data())
        # userId = data["userId"]
        if userId == 0:
            random_sql = f"SELECT OrganizationId FROM Organization;"
            random_id = sql_command(random_sql)
            lenth = len(random_id)
            random_list = []
            random_list = np.arange(1, lenth + 1)
            np.random.shuffle(random_list)
            random_list = list(random_list[0:6])

            select_str = 'select CompanyName, Location, Field, Icon from organization where OrganizationId in (%s)' % ','.join(
                ['%s'] * len(random_list))
            output_info = search_list(select_str, random_list)
            label_name = ["CompanyName", "Location", "Field", "Icon"]
            output_res = output_list(output_info, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
        else:
            skill_sql = f"SELECT Skill FROM individual WHERE IndividualId = '{userId}';"
            result_from_skill = sql_command(skill_sql)

            offer_sql = f"SELECT OrganizationName, Location, Field, Icon  FROM organization WHERE Field = '{result_from_skill[0][0]}';"
            result_from_offer = sql_command(offer_sql)
            label_name = ["OrganizationName", "Location", "Field", "Icon"]
            output_res = output_list(result_from_offer, label_name)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
