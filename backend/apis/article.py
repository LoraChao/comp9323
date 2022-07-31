import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

# define namespace
auth = api.namespace('article', description='Article Service')

# auth api is for user registration and login

# route function
# individual user's sign up
@auth.route('/get')
class ArticleGet(Resource):
    @auth.response(200, 'OK')
    @auth.response(400, 'Bad Request')
    @auth.response(404, 'Not Found')
    @auth.response(201, 'Created')
    # @auth.expect(follow_offer_model)
    def get(self):
        data = json.loads(request.get_data())
        articleId = data["Article_ID"]

        article_sql = f"SELECT * FROM article WHERE ArticleID='{articleId}';"  # database_info
        result_from_article = sql_command(article_sql)

        if not result_from_article:
            output = {
                "message": "false"
            }
            return output, 403
        else:
            output = {
                "ArticleID": result_from_article[0][0],
                "title": result_from_article[0][2],
                "label": result_from_article[0][5],
                "wordContent": result_from_article[0][1],
                "LikeNum": result_from_article[0][3],
                "Author": result_from_article[0][4],
            }

            return output, 200