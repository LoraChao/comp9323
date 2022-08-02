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

#ziheng
@cont.route('/<int:individualID>/recommandationList', doc={'description': 'get recommanded content list'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class RecommandationList(Resource):
    def get(self, individualID):
        user_sql = f"SELECT Preference FROM individual WHERE IndividualID = {individualID};"
        if sql_command(user_sql):
            taste_sql = f"SELECT * from Individual_taste WHERE IndividualID = {individualID};"
            result_from_db = sql_dicresult_with_decription(taste_sql)
            return 200

     
@cont.route('/<int:individualID>/preferList', doc={'description': 'get preference list'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class PreferList(Resource):
    def get(self, individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            prefer_sql = f"SELECT ArticleID FROM IndividualPrefer WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(prefer_sql)
            if result_from_db:
                result = []
                for e in result_from_db:
                    org_sql = f"SELECT * FROM Article WHERE ArticleID = '{e['ArticleID']}';"
                    result_from_db = sql_dicresult_with_decription(org_sql)
                    result.append(result_from_db)
                output = {
                    'message': result,
                }
                return output, 200
            else:
                output = {
                    'message': 'This account does not like anything'
                }
                return output, 200
        else:
            output = {
                'message': 'Please input user vaild ID'
            }
            return output, 404

    @cont.doc(description = 'add new like')
    @cont.expect(prefer_model)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT ArticleTag FROM Article WHERE ArticleID = {ArticleID};"
            result_from_db = sql_dicresult_with_decription(ind_sql)
            if result_from_db:
                type = result_from_db['ArticleTag']
                like_sql = f"insert into IndividualPrefer (individualID,ArticleID,type) select {individualID},{ArticleID},{type} where not exists(select individualID from IndividualPrefer where individualID = {individualID} and ArticleID={ArticleID} and type={type});"
                count_sql = f"UPDATE Article set ArticleLikeNum = ArticleLikeNum + 1 where ArticleID = {ArticleID}"
                taste_sql = f"UPDATE Individual_taste {type} = {type} + 1 where individualID = {individualID};"
                sql_command(like_sql)
                sql_command(count_sql)
                sql_command(taste_sql)
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

    @cont.doc(description = 'delete a like')
    @cont.expect(prefer_model)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT * FROM Article WHERE ArticleID={ArticleID};"
            if sql_command(ind_sql):
                type='article'
                like_sql = f"DELETE from IndividualPrefer WHERE individualID = {individualID} and ArticleID = {ArticleID};"
                count_sql =f"UPDATE Article set ArticleLikeNum = ArticleLikeNum - 1 where ArticleID ={ArticleID};"
                taste_sql = f"UPDATE Individual_taste {type} = {type} - 1 where individualID = {individualID};"
                sql_command(like_sql)
                sql_command(count_sql)
                sql_command(taste_sql)
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
#zhao
@cont.route('/<int:individualID>/orgFollowList', doc={'description': 'org follow list operation'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class orgFollowList(Resource):
    @cont.doc(description = 'get org follow list')
    def get(self, individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT orgID FROM orgfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                org_follow = []
                for e in result_from_db:
                    org_sql = f"SELECT * FROM Organization WHERE OrganizationId ='{e['orgID']}';"
                    result_from_db = sql_dicresult_with_decription(org_sql)
                    org_follow.append(result_from_db)
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

            
    @cont.doc(description = 'add new org follow')
    @cont.expect(post_follow_org_model)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            orgID = request.json['orgID']
            ind_sql = f"SELECT * FROM Organization WHERE OrganizationID={orgID};"
            if sql_command(ind_sql):
                follow_sql = f"insert into orgfollowlist (individualID,orgID) select {individualID},{orgID} where not exists(select individualID from orgfollowlist where individualID = {individualID} and orgID={orgID});"
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

    @cont.doc(description = 'delete new follow')
    @cont.expect(delete_follow_org_model)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            orgID_list = request.json['Company']
            if orgID_list:
                for orgID in orgID_list:
                    follow_sql = f"DELETE from orgFollowList WHERE individualID = {individualID} AND orgID = {orgID};"
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


@cont.route('/<int:individualID>/indFollowList', doc={'description': 'ind follow list operation'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class indFollowList(Resource):
    @cont.doc(description = 'get ind follow list')
    def get(self, individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT indID FROM indfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                ind_follow = []
                for e in result_from_db:
                    ind_sql = f"SELECT * FROM Individual WHERE IndividualID ='{e['ind']}';"
                    result_from_db = sql_dicresult_with_decription(ind_sql)
                    ind_follow.append(result_from_db)
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

    @cont.doc(description = 'add new ind follow')
    @cont.expect(post_follow_ind_model)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID = request.json['indID']
            ind_sql = f"SELECT * FROM Individual WHERE IndividualID={indID};"
            if sql_command(ind_sql):
                follow_sql = f"insert into indfollowlist (individualID,indID) select {individualID},{indID} where not exists(select individualID from indfollowlist where individualID = {individualID} and indID={indID});"
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
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @cont.doc(description = 'delete new ind follow')
    @cont.expect(delete_follow_ind_model)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID_list = request.json['Individual']
            if indID_list:
                for indID in indID_list:
                    follow_sql = f"DELETE from indFollowList WHERE individualID = {individualID} AND indID = {indID};"
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
