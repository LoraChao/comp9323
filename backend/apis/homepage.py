import json
import random

from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api
import numpy as np

# define namespace
home = api.namespace('homepage', description='Homepage Service')

@home.route('/preferJob_ind/<int:userId>')
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class GetJob_ind(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='get prefer job list')
    def get(self, userId):
        fill_list = {"CompanyName": "", "Position": "", "Contact": ""}
        if userId == 0:
            random_sql = f"SELECT OfferId FROM offer;"
            random_id = sql_command(random_sql)
            lenth = len(random_id)
            random_list = []
            random_list = np.arange(1,lenth+1)
            np.random.shuffle(random_list)
            random_list = list(random_list[0:5])

            select_str = 'select OfferId, CompanyName,Position,Contact from offer where OfferId in (%s)' % ','.join(['%s'] * len(random_list))
            output_info = search_list(select_str, random_list)
            label_name = ["OfferId", "CompanyName", "Position", "Contact"]
            output_res = output_list(output_info, label_name)
            while len(output_res) < 5:
                output_res.append(fill_list)
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
            offerId_sql = f"SELECT OfferId FROM offer;"
            offerId_match = sql_command(offerId_sql)
            offerId_list = []
            for i in offerId_match:
                offerId_list.append(i[0])
            test = rec_list + offerId_list
            new = list(set(test))
            new.sort(key=test.index)
            new = new[0:5]
            select_str = 'select OfferId, CompanyName,Position,Contact from offer where OfferId in (%s)' % ','.join(['%s'] * len(new))
            output_info = search_list(select_str, new)
            label_name = ["OfferId", "CompanyName", "Position", "Contact"]
            output_res = output_list(output_info, label_name)
            while len(output_res) < 5:
                output_res.append(fill_list)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200

@home.route('/PostSentence' ,doc={'description': 'get one sentence a day'})
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
        Id_list = np.arange(lenth+1)
        Id_list = np.array(Id_list[1:])
        np.random.shuffle(Id_list)

        sentence_sql = f"SELECT Content FROM sentence where SentenceID = '{Id_list[0]}';"
        result_from_sentence = sql_command(sentence_sql)
        output= {
            "message": "success",
            "Content": result_from_sentence[0][0]
        }
        return output, 200

@home.route('/expert/<int:userId>', doc={'description': 'get recommend expert'})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class GetExpert(Resource):
    @api.doc(description='get experts')
    def get(self, userId):
        fit_empty = {"ExpertsName": "", "Tag": "", "Introduce": "", "Email": "", "Icon": ""}
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
            while len(output_res) < 3:
                output_res.append(fit_empty)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
        else:
            emo_sql = f"SELECT Emo FROM individual WHERE IndividualId = '{userId}';"
            res_emo = sql_command(emo_sql)[0][0]
            if res_emo == '0':
                skill_sql = f"SELECT Skill FROM individual WHERE IndividualId = '{userId}';"
                result_from_skill = sql_command(skill_sql)

                if not result_from_skill:
                    output = {
                        "message": "fail"
                    }
                    return output, 400
                else:
                    skill = result_from_skill[0][0]
                    if skill == "":
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
                        while len(output_res) < 3:
                            output_res.append(fit_empty)
                        output = {
                            "message": "success",
                            "output": output_res
                        }
                        return output, 200
                    skill_match_sql = f"SELECT ExpertsName, Tag, Introduce, Email, Icon FROM experts WHERE Tag = '{skill}';"
                    skill_match = sql_command(skill_match_sql)
                    label_name = ["ExpertsName", "Tag", "Introduce", "Email", "Icon"]
                    output_res = output_list(skill_match, label_name)
                    while len(output_res) < 3:
                        output_res.append(fit_empty)
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
                    # skill_match_sql = f"SELECT ExpertsName, Tag, Introduce, Email, Icon FROM experts WHERE Tag = '{skill}';"
                    skill_match_sql = f"SELECT ExpertsID FROM experts WHERE Tag = '{skill}';"
                    skill_match = sql_command(skill_match_sql)
                    skill_match_list = []
                    for i in skill_match:
                        skill_match_list.append(i[0])
                    Psychology = 'Psychology'
                    skill_match_psy_sql = f"SELECT ExpertsID FROM experts WHERE Tag = '{Psychology}';"
                    skill_match_psy = sql_command(skill_match_psy_sql)
                    skill_match_psy_list = []
                    for i in skill_match_psy:
                        skill_match_psy_list.append(i[0])
                    print(skill_match_psy_list)
                    a = []
                    a.append(random.choice(skill_match_psy_list))
                    rec_list = a + skill_match_list[0:2]
                    select_str = 'select ExpertsName, Tag, Introduce, Email, Icon from experts where ExpertsID in (%s)' % ','.join(
                        ['%s'] * len(rec_list))
                    output_info = search_list(select_str, rec_list)
                    label_name = ["ExpertsName", "Tag", "Introduce", "Email", "Icon"]
                    output_res = output_list(output_info, label_name)
                    # while len(output_res) < 3:
                    #     output_res.append(fit_empty)
                    output = {
                        "message": "success",
                        "output": output_res,
                        # "output2": skill_match_sql
                    }
                    return output, 200

@home.route('/prefer_org/<int:userId>' ,doc={'description': 'get recommend org'})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class Getorg_ind(Resource):
    # @auth.expect(post_dairy_model)
    @api.doc(description='get prefer org')
    def get(self, userId):
        fit_empty = {"OrganizationId":"", "OrganizationName":"", "Location":"", "Field":"", "Icon":""}
        if userId == 0:
            random_sql = f"SELECT OrganizationId FROM Organization;"
            random_id = sql_command(random_sql)
            lenth = len(random_id)
            random_list = []
            random_list = np.arange(1, lenth + 1)
            np.random.shuffle(random_list)
            random_list = list(random_list[0:6])

            select_str = 'select OrganizationId, OrganizationName, Location, Field, Icon from organization where OrganizationId in (%s)'% ','.join(
                ['%s'] * len(random_list))
            output_info = search_list(select_str, random_list)
            label_name = ["OrganizationId", "OrganizationName", "Location", "Field", "Icon"]
            output_res = output_list(output_info, label_name)
            while len(output_res) < 3:
                output_res.append(fit_empty)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
        else:
            skill_sql = f"SELECT Skill FROM individual WHERE IndividualId = '{userId}';"
            result_from_skill = sql_command(skill_sql)

            offer_sql = f"SELECT OrganizationId, OrganizationName, Location, Field, Icon  FROM organization WHERE Field = '{result_from_skill[0][0]}';"
            result_from_offer = sql_command(offer_sql)
            label_name = ["OrganizationId", "OrganizationName", "Location", "Field", "Icon"]
            output_res = output_list(result_from_offer, label_name)
            while len(output_res) < 3:
                output_res.append(fit_empty)
            output = {
                "message": "success",
                "output": output_res
            }
            return output, 200
