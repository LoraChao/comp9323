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
        user_sql = f"SELECT IndividualName, Emo FROM Individual WHERE IndividualID = {individualID};"
        user = sql_dicresult_with_decription(user_sql)
        if user:
            emo = user[0]['Emo']
            taste_sql = f"SELECT * from Taste WHERE IndividualID = {individualID};"
            result_from_db = sql_dicresult_with_decription(taste_sql)[0]
            if result_from_db:
                recommend_vector = {key:value for key,value in result_from_db.items() if key != "TasteID" and  key != "IndividualId"}
                if sum(recommend_vector.values()) is not 0:
                    for key,value in recommend_vector.items():
                        recommend_vector[key] = value*9//sum(recommend_vector.values())
                    if emo:
                        if sum(recommend_vector.values()) <12:
                            recommend_vector['Mental'] = recommend_vector['Mental'] + 1
                    recommendation = []
                    other = recommend_vector.keys()
                    for key,value in recommend_vector.items():
                        sql = f"SELECT * FROM Article WHERE ArticleTag = '{key}' and not exists(select 1 from individualprefer where IndividualID = {individualID} and Article.ArticleID = individualprefer.ArticleID);"
                        
                        if value == 0:
                            other = "','".join(key)
                        try:
                            recommendation.extend(sql_dicresult_with_decription(sql))[:value]
                        except:
                            pass
                    if len(recommendation)<12:
                        sql = f"SELECT * FROM Article WHERE ArticleTag in '{other}';"
                        try:
                            recommendation.extend(sql_dicresult_with_decription(sql)[:12-len(recommendation)])
                        except:
                            pass
                    return recommendation, 200
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
        else:
            output = {
                'message': 'Please input user vaild ID'
            }
            return output, 404
     
@cont.route('/<int:individualID>/preferList', doc={'description': 'get preference list'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class PreferList(Resource):
    def get(self, individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            prefer_sql = f"SELECT ArticleID FROM IndividualPrefer WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(prefer_sql)
            if result_from_db:
                result = []
                for e in result_from_db:
                    org_sql = f"SELECT * FROM Article WHERE ArticleID = '{e['ArticleID']}';"
                    result_from_db = sql_dicresult_with_decription(org_sql)
                    result.extend(result_from_db)
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
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT ArticleTag FROM Article WHERE ArticleID = {ArticleID};"
            result_from_db = sql_dicresult_with_decription(ind_sql)[0]
            if result_from_db:
                type = result_from_db['ArticleTag']
                like_sql = f"insert into IndividualPrefer (individualID,ArticleID,type) select {individualID},{ArticleID},{type} where not exists(select individualID from IndividualPrefer where individualID = {individualID} and ArticleID={ArticleID} and type={type});"
                count_sql = f"UPDATE Article set ArticleLikeNum = ArticleLikeNum + 1 where ArticleID = {ArticleID}"
                taste_sql = f"UPDATE Taste {type} = {type} + 1 where individualID = {individualID};"
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
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            ArticleID = request.json['articleID']
            ind_sql = f"SELECT * FROM Article WHERE ArticleID={ArticleID};"
            if sql_command(ind_sql):
                type='article'
                like_sql = f"DELETE from IndividualPrefer WHERE individualID = {individualID} and ArticleID = {ArticleID};"
                count_sql =f"UPDATE Article set ArticleLikeNum = ArticleLikeNum - 1 where ArticleID ={ArticleID};"
                taste_sql = f"UPDATE Taste {type} = {type} - 1 where individualID = {individualID};"
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
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT orgID FROM orgfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                org_follow = []
                for e in result_from_db:
                    org_sql = f"SELECT * FROM Organization WHERE OrganizationId ='{e['orgID']}';"
                    result_from_db = sql_dicresult_with_decription(org_sql)
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

            
    @cont.doc(description = 'add new org follow')
    @cont.expect(post_follow_org_model)
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

    @cont.doc(description = 'delete new follow')
    @cont.expect(delete_follow_org_model)
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


@cont.route('/<int:individualID>/indFollowList', doc={'description': 'ind follow list operation'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class indFollowList(Resource):
    @cont.doc(description = 'get ind follow list')
    def get(self, individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            follow_sql = f"SELECT IndID FROM Indfollowlist WHERE IndividualID={individualID};"
            result_from_db = sql_dicresult_with_decription(follow_sql)
            if result_from_db:
                ind_follow = []
                for e in result_from_db:
                    ind_sql = f"SELECT * FROM Individual WHERE IndividualID ='{e['indID']}';"
                    result_from_db = sql_dicresult_with_decription(ind_sql)
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

    @cont.doc(description = 'add new ind follow')
    @cont.expect(post_follow_ind_model)
    def post(self,individualID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID={individualID};"
        if sql_command(user_sql):
            indID = request.json['indID']
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
                'message': 'Please input vaild user ID'
            }
            return output, 404

    @cont.doc(description = 'delete new ind follow')
    @cont.expect(delete_follow_ind_model)
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
