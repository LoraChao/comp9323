from distutils.log import ERROR
import json
from flask import request
from flask_restx import Resource
from flask_restx import reqparse
from requests import delete
from models.request_model import *
from tool import *


# define namespace
cont = api.namespace('cont', description='Content Service')

# cont api is for content event


@cont.route('/<int:individualID>/recommandationList', doc={'description': 'get recommanded content list'})
@cont.response(400, 'Bad Request')

@cont.response(200, 'Ok')
class RecommandationList(Resource):
    def get(self, individualID):
        return 200

     
@cont.route('/<int:individualID>/preferList', doc={'description': 'get preference list'})
@cont.response(400, 'Bad Request')

@cont.response(200, 'Ok')
class PreferList(Resource):
    def get(self, individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            prefer_sql = f"SELECT PreferID FROM IndividualPrefer WHERE IndividualID={individualID};"
            result_from_db = sql_command(prefer_sql)
            if result_from_db:
                result = []
                link_dict = {}
                for e in result_from_db:
                    org_sql = f"SELECT OrganizationId,OrganizationName,Description,Icon FROM Organization WHERE OrganizationId='{e[0]}';"
                    result_from_db = sql_result_with_decription(org_sql)
                    result_from_db['follow'] = 'follow'
                    result.append(result_from_db)
                output = {
                    'message': result,
                }
                return output, 200
            else:
                output = {
                    'message': 'This account does not follow anyone'
                }
                return output, 200
        else:
            output = {
                'message': 'Please input user vaild ID'
            }
            return output, 404
        return 200

 
@cont.route('/<int:individualID>/FollowList', doc={'description': 'follow list operation'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class FollowList(Resource):
    @cont.doc(description = 'get follow list')
    def get(self, individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT FollowedID FROM FollowList WHERE IndividualID={individualID};"
            result_from_db = sql_command(follow_sql)
            if result_from_db:
                ind_follow = []
                org_follow = []
                for e in result_from_db:
                    org_sql = f"SELECT OrganizationId,OrganizationName,Description,Icon FROM Organization WHERE OrganizationId='{e[0]}';"
                    result_from_db = sql_result_with_decription(org_sql)
                    result_from_db['follow'] = 'follow'
                    if result_from_db['Type'] == 'individual':
                        ind_follow.append(result_from_db)
                    else:
                        org_follow.append(result_from_db)
                output = {
                    'ind_follow': ind_follow,
                    'org_follow': org_follow
                }
                return output, 200
            else:
                output = {
                    'message': 'This account does not follow anyone'
                }
                return output, 200
        else:
            output = {
                'message': 'Please input user vaild ID'
            }
            return output, 404

            
    @cont.doc(description = 'add new follow')
    @cont.expect(follow_model)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            contID = request.json
            ind_sql = f"SELECT * FROM Individual WHERE IndividualID={contID};"
            if sql_command(ind_sql):
                follow_sql = f"INSERT IGNORE INTO FollowList VALUES ({individualID},{contID},'individual');"
                try:
                    sql_command(follow_sql)
                except:
                    pass
                output = {
                    'message': 'well done'
                }
                return output,200
            else:
                output = {
                    'message': 'Please input vaild article ID'
                }
                return output,404
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @cont.doc(description = 'delete new follow')
    @cont.expect(follow_model)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID_list = request.json['Individual']
            if indID_list:
                for indID in indID_list:
                    ind_sql = f"SELECT * FROM individual WHERE IndividualID = {indID};"
                    if sql_command(ind_sql):
                        follow_sql = f"DELETE from indFollowList WHERE individualID = {individualID} AND indID = {indID};"
                        try:
                            sql_command(follow_sql)
                            pass
                        except:
                            pass
                    else:
                        output = {
                            'message': 'Please input vaild ind ID'
                        }
                        return output,404
                output = {
                    'message': 'well done'
                }
                return output,200

            orgID_list = request.json['Company']
            if orgID_list:
                for orgID in orgID_list:
                    org_sql = f"SELECT * FROM Organization WHERE OrganizationID = {orgID};"
                    if sql_command(org_sql):
                        follow_sql = f"DELETE from orgFollowList WHERE IndividualID = {individualID} AND orgID = {orgID};"
                        try:
                            sql_command(follow_sql)
                            pass
                        except:
                            pass
                    else:
                        output = {
                            'message': 'Please input vaild org ID'
                        }
                        return output,404
                output = {
                    'message': 'well done'
                }
                return output,200

        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404
