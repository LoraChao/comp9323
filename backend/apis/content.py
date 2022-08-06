from distutils.log import ERROR
import json
from flask import request
from flask_restx import Resource
from flask_restx import reqparse
from requests import delete
from models.request_model import *
from tool import *
import random


# define namespace
cont = api.namespace('cont', description='Content Service')

# cont api is for content event

@cont.route('/<int:individualID>/preferstate/<int:articleID>', doc={'description': 'check like states'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class CheckLikeStates(Resource):
    def get(self, individualID,articleID):
        user_sql = f"SELECT IndividualName FROM Individual WHERE IndividualID = {individualID};"
        user = sql_command(user_sql)
        if user:
            check_url = f"SELECT * FROM IndividualPrefer WHERE IndividualID = {individualID} AND ArticleID = {articleID}"
            if sql_command(check_url):
                output = {'states': 1}
                return output,200
            else:
                output = {'states': 0}
                return output,200
        else:
            output = {'states': 2}
            return output,404

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
                if sum(recommend_vector.values()) != 0:
                    for key,value in recommend_vector.items():
                        recommend_vector[key] = value*7//sum(recommend_vector.values())
                    if emo:
                        if sum(recommend_vector.values()) <9:
                            recommend_vector['Mental'] = recommend_vector['Mental'] + 1
                    recommendation = []
                    more = []
                    other = recommend_vector.keys()
                    for key,value in recommend_vector.items():
                        sql = f"SELECT * FROM Article WHERE ArticleTag = '{key}' and not exists(select 1 from individualprefer where IndividualID = {individualID} and Article.ArticleID = individualprefer.ArticleID);"
                        if value == 0:
                            more.append(key)
                        else:
                            list = sql_dicresult_with_decription(sql)
                            random.shuffle(list)
                            recommendation.extend(list[:value])
                        
                    if len(more):
                            other = "','".join(more)
                    else:
                            other = "','".join(other)
                    
                    if len(recommendation)<9:
                        sql = f"SELECT * FROM Article WHERE ArticleTag in ('{other}');"
                        list = sql_dicresult_with_decription(sql)
                        random.shuffle(list)
                        recommendation.extend(list[:9-len(recommendation)])
                    for e in recommendation:
                        e['description'] = e['Article'][:50]+'...'
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
     
@cont.route('/<int:individualID>/preferList', doc={'description': 'preference list opration'})
@cont.response(400, 'Bad Request')
@cont.response(404, 'Not Found')
@cont.response(200, 'Ok')
class PreferList(Resource):
    @cont.doc(description = 'get new like')
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
                    'art_like': result,
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
                like_sql = f"insert into IndividualPrefer (individualID,ArticleID,type) select {individualID},{ArticleID},'{type}' where not exists(select individualID from IndividualPrefer where individualID = {individualID} and ArticleID={ArticleID} and type='{type}');"
                count_sql = f"UPDATE Article SET ArticleLikeNum = ArticleLikeNum + 1 where ArticleID = {ArticleID};"
                taste_sql = f"UPDATE Taste SET {type} = {type} + 1 where individualID = {individualID};"
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
            ind_sql = f"SELECT ArticleTag FROM Article WHERE ArticleID={ArticleID};"
            result_from_db = sql_dicresult_with_decription(ind_sql)[0]
            if result_from_db:
                type = result_from_db['ArticleTag']
                like_sql = f"DELETE from IndividualPrefer WHERE individualID = {individualID} and ArticleID = {ArticleID};"
                count_sql =f"UPDATE Article set ArticleLikeNum = ArticleLikeNum - 1 where ArticleID ={ArticleID};"
                taste_sql = f"UPDATE Taste SET {type} = {type} - 1 where individualID = {individualID};"
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

