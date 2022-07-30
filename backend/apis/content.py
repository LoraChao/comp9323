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
        user_sql = f"SELECT Preference FROM individual WHERE IndividualID={individualID};"
        result_from_db = sql_command(user_sql)
        if result_from_db:
            
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
            result_from_db = sql_command(prefer_sql)
            if result_from_db:
                result = []
                for e in result_from_db:
                    org_sql = f"SELECT ArticleID,ArticleTitle,Auther,Article,ArticleTag FROM Article WHERE ArticleID='{e[0]}';"
                    result_from_db = sql_result_with_decription(org_sql)
                    result_from_db['follow'] = 'follow'
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
    @cont.expect(follow_org_moedl)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT * FROM Article WHERE ArticleID={ArticleID};"
            if sql_command(ind_sql):
                type='article'
                like_sql = f"INSERT IGNORE INTO IndividualPrefer VALUES ({individualID},{ArticleID},{type});"
                count_sql =f"UPDATE Article set ArticleLikeNum = ArticleLikeNum + 1 where ArticleID ={ArticleID}"
                try:
                    sql_command(like_sql)
                    sql_command(count_sql)
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

    @cont.doc(description = 'delete a like')
    @cont.expect(follow_org_moedl)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT * FROM Article WHERE ArticleID={ArticleID};"
            if sql_command(ind_sql):
                type='article'
                like_sql = f"DELETE from IndividualPrefer WHERE individualID = {individualID} and ArticleID = {ArticleID};"
                count_sql =f"UPDATE Article set ArticleLikeNum = ArticleLikeNum - 1 where ArticleID ={ArticleID}"
                try:
                    sql_command(like_sql)
                    sql_command(count_sql)
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
            result_from_db = sql_command(follow_sql)
            if result_from_db:
                org_follow = []
                for e in result_from_db:
                    org_sql = f"SELECT OrganizationId,OrganizationName,Description,Icon FROM Organization WHERE OrganizationId='{e[0]}';"
                    result_from_db = sql_result_with_decription(org_sql)
                    result_from_db['follow'] = 'follow'
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
    @cont.expect(follow_org_moedl)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            orgID = request.json['orgID']
            ind_sql = f"SELECT * FROM Organization WHERE OrganizationID={orgID};"
            if sql_command(ind_sql):
                follow_sql = f"INSERT IGNORE INTO orgfollowlist VALUES ({individualID},{orgID});"
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
                    'message': 'Please input vaild org ID'
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
            orgID_list = request.json['Company']
            if orgID_list:
                for orgID in orgID_list:
                    follow_sql = f"DELETE from orgFollowList WHERE individualID = {individualID} AND orgID = {orgID};"
                    try:
                        sql_command(follow_sql)
                        pass
                    except:
                        pass
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
            result_from_db = sql_command(follow_sql)
            if result_from_db:
                ind_follow = []
                for e in result_from_db:
                    ind_sql = f"SELECT IndividualId,IndividualName,Occupation FROM Individual WHERE IndividualID='{e[0]}';"
                    result_from_db = sql_result_with_decription(ind_sql)
                    result_from_db['follow'] = 'follow'
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
    @cont.expect(follow_ind_moedl)
    def post(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID = request.json['indID']
            ind_sql = f"SELECT * FROM Individual WHERE IndividualID={indID};"
            if sql_command(ind_sql):
                follow_sql = f"INSERT IGNORE INTO indfollowlist VALUES ({individualID},{indID});"
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
                    'message': 'Please input vaild follow ind ID'
                }
                return output,404
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @cont.doc(description = 'delete new ind follow')
    @cont.expect(follow_model)
    def delete(self,individualID):
        user_sql = f"SELECT individualName FROM individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID_list = request.json['Individual']
            if indID_list:
                for indID in indID_list:
                    follow_sql = f"DELETE from indFollowList WHERE individualID = {individualID} AND indID = {indID};"
                    try:
                        sql_command(follow_sql)
                        pass
                    except:
                        pass
                output = {
                    'message': 'well done'
                }
                return output,200
        else:
            output = {
                'message': 'Please input vaild user ID'
            }
            return output, 404
