import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

article = api.namespace('article', description='Article Service')

@article.route('/get/<int:articleId>')
class ArticleGet(Resource):
    @article.response(200, 'OK')
    @article.response(400, 'Bad Request')
    @article.response(404, 'Not Found')
    @article.response(201, 'Created')
    # @article.expect(get_article_model)
    def get(self, articleId):

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
                "title": result_from_article[0][1],
                "label": result_from_article[0][5],
                "wordContent": result_from_article[0][3],
                "LikeNum": result_from_article[0][4],
                "Author": result_from_article[0][2],
            }

            return output, 200
