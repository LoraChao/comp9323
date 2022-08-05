from distutils.log import ERROR
import json
from flask import request
from flask_restx import Resource
from flask_restx import reqparse
from requests import delete
from models.request_model import *
from tool import *

# define namespace
follow = api.namespace('follow', description='follow Service')

@follow.route('/<int:individualID>/indfollowstate/<int:indID>', doc={'description': 'check ind follow states'})
@follow.response(400, 'Bad Request')
@follow.response(404, 'Not Found')
@follow.response(200, 'Ok')
class CheckIndFollowStates(Resource):
    def get(self, individualID,indID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID = {individualID};"
        user = sql_command(user_sql)
        if user:
            check_url = f"SELECT * FROM indfollowlist WHERE IndividualID = {individualID} AND indID = {indID}"
            if sql_command(check_url):
                output = {'states': 1}
                return output,200
            else:
                output = {'states': 0}
                return output,200
        else:
            output = {'states': 2}
            return output,404

@follow.route('/<int:individualID>/orgfollowstate/<int:orgID>', doc={'description': 'check org follow states'})
@follow.response(400, 'Bad Request')
@follow.response(404, 'Not Found')
@follow.response(200, 'Ok')
class CheckOrgFollowStates(Resource):
    def get(self, individualID,orgID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID = {individualID};"
        user = sql_command(user_sql)
        if user:
            check_url = f"SELECT * FROM orgfollowlist WHERE IndividualID = {individualID} AND orgID = {orgID}"
            if sql_command(check_url):
                output = {'states': 1}
                return output,200
            else:
                output = {'states': 0}
                return output,200
        else:
            output = {'states': 2}
            return output,404

@follow.route('/<int:individualID>/orgFollowList', doc={'description': 'org follow list operation'})
@follow.response(400, 'Bad Request')
@follow.response(404, 'Not Found')
@follow.response(200, 'Ok')
class orgFollowList(Resource):
    @follow.doc(description = 'get org follow list')
    def get(self, individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT orgID FROM orgfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                org_follow = []
                for e in result_from_db:
                    org_sql = f"SELECT * FROM Organization WHERE OrganizationId ='{e['orgID']}';"
                    result_from_db = sql_dicresult_with_decription(org_sql)
                    for e in result_from_db:
                        e.pop("Password")
                    org_follow.extend(result_from_db)
                output = {
                    'org_follow': org_follow
                }
                return output, 200
            else:
                output = {
                    'message': 'This account does not follow any organization'
                }
                return output, 200
        else:
            output = {
                'message': 'Please input user vaild ID'
            }
            return output, 404

            
    @follow.doc(description = 'add new org follow')
    @follow.expect(post_follow_org_model)
    def post(self,individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            orgID = request.json['orgID']
            ind_sql = f"SELECT * FROM Organization WHERE OrganizationID={orgID};"
            if sql_command(ind_sql):
                follow_sql = f"INSERT INTO Orgfollowlist (IndividualID,OrgID) SELECT {individualID},{orgID} WHERE NOT EXISTS(SELECT IndividualID FROM Orgfollowlist WHERE IndividualID = {individualID} AND OrgID={orgID});"
                sql_command(follow_sql)
                output = {
                    'message': 'well done'
                }
                return output,200
            else:
                output = {
                    'message': 'Please input vaild org ID'
                }
                return output,404
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @follow.doc(description = 'delete new follow')
    @follow.expect(delete_follow_org_model)
    def delete(self,individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            orgID_list = request.json['Company']
            if orgID_list:
                for orgID in orgID_list:
                    follow_sql = f"DELETE FROM OrgFollowList WHERE IndividualID = {individualID} AND OrgID = {orgID};"
                    sql_command(follow_sql)
                output = {
                    'message': 'well done'
                }
                return output,200
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404


@follow.route('/<int:individualID>/indFollowList', doc={'description': 'ind follow list operation'})
@follow.response(400, 'Bad Request')
@follow.response(404, 'Not Found')
@follow.response(200, 'Ok')
class indFollowList(Resource):
    @follow.doc(description = 'get ind follow list')
    def get(self, individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT IndID FROM Indfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                ind_follow = []
                for e in result_from_db:
                    ind_sql = f"SELECT * FROM Individual WHERE IndividualID ='{e['IndID']}';"
                    result_from_db = sql_dicresult_with_decription(ind_sql)
                    for e in result_from_db:
                        e.pop("Password")
                    
                    ind_follow.extend(result_from_db)
                output = {
                    'ind_follow': ind_follow,
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

    @follow.doc(description = 'add new ind follow')
    @follow.expect(post_follow_ind_model)
    def post(self,individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID = request.json['indID']
            if indID != individualID:
                ind_sql = f"SELECT * FROM Individual WHERE IndividualID={indID};"
                if sql_command(ind_sql):
                    follow_sql = f"INSERT INTO Indfollowlist (IndividualID,IndID) SELECT {individualID},{indID} WHERE NOT EXISTS (SELECT IndividualID FROM Indfollowlist WHERE IndividualID = {individualID} AND IndID={indID});"
                    sql_command(follow_sql)
                    output = {
                        'message': 'well done'
                    }
                    return output,200
                else:
                    output = {
                        'message': 'Please input vaild follow ind ID'
                    }
                    return output,404
            else:
                output = {
                'message': 'You cannot follow yourself'
            }
            return output
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @follow.doc(description = 'delete new ind follow')
    @follow.expect(delete_follow_ind_model)
    def delete(self,individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID_list = request.json['Individual']
            if indID_list:
                for indID in indID_list:
                    follow_sql = f"DELETE FROM IndFollowList WHERE IndividualID = {individualID} AND IndID = {indID};"
                    sql_command(follow_sql)
                output = {
                    'message': 'well done'
                }
                return output,200
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404
