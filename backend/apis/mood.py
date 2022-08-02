import json
from flask import request
from flask_restx import Resource
from pymysql.converters import escape_string
from models.request_model import *
from tool import *
from flask_app import api

mood = api.namespace('mood', description='mood Service')

@mood.route('/post', doc={"description": "post new mood"})
@api.response(400, 'Bad Request')
@api.response(403, 'Forbiddent')
@api.response(201, 'Created')
class PostDairy(Resource):
    @mood.expect(post_dairy_model)
    @api.doc(description='post a new dairy to database')
    def post(self):
        data = json.loads(request.get_data())
        IndividualId = data['IndividualId']
        RecordTime = data['RecordTime']
        Mood = data['Mood']
        if IndividualId == "" or RecordTime == "" or Mood == "":
            output = {
                "message": "false"
            }
            return output, 400
        else:
            MoodID = 0
            sql = "INSERT INTO mood VALUES ({}, '{}', '{}', '{}');".format(MoodID, IndividualId, RecordTime, Mood)
            sql_command(sql)
            output = {
                "message": "Success Post",
                "IndividualId": IndividualId,
                "RecordTime": RecordTime,
                "Mood": Mood
            }
            return output, 200


@mood.route('/search')
class SearchDairy(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    @mood.expect(search_dairy_model)
    def get(self):
        data = json.loads(request.get_data())
        IndividualId = data['IndividualId']
        tmp_Date = data["RecordTime"][0:10].split("-")
        # output = {
        #     "message": tmp_Date
        # }
        # return output, 200
        Date = tmp_Date[2]+'/'+tmp_Date[1]+'/'+tmp_Date[0]

        if IndividualId == "":
            output = {
                "message": "false"
            }
            return output, 400
        
        dairy_sql = f"SELECT * FROM mood WHERE IndividualId='{IndividualId}';" #database_info
        result_from_dairy = sql_command(dairy_sql)
       
        if not result_from_dairy:
            output = {
                "message": "false"
            }
            return output, 403
        for day in result_from_dairy:
            if Date == day[2]:
                output = {
                    "message": "success",
                    "MoodID": day[0],
                    "IndividualId": day[1],
                    "RecordTime": day[2],
                    "Mood": day[3]
                }
                return output, 200
            else:
                output = {
                    "message": "false",
                }
                return output, 403

@mood.route('/check')
class CheckDairy(Resource):
    @api.response(200, 'OK')
    @api.response(400, 'Bad Request')
    @api.response(404, 'Not Found')
    @api.response(201, 'Created')
    @mood.expect(mood_check_model)
    def post(self):
        data = json.loads(request.get_data())
        IndividualId = data['IndividualId']

        dairy_sql = f"SELECT * FROM mood WHERE IndividualId='{IndividualId}';"
        result_from_dairy = sql_command(dairy_sql)

        if not result_from_dairy:
            output = {
                "message": "false"
            }
            return output, 403

        count_well = 0
        count_bad = 0
        for day in result_from_dairy:
            if day[3].lower() == 'well':
                count_well += 1
            if day[3].lower() == 'bad':
                count_bad += 1
            # return day[3].upper()

        if count_bad > count_well:
            sql = "UPDATE individual SET Emo='{}' WHERE individualId = '{}';".format(1, IndividualId)
            sql_command(sql)
            output = {
                "message": "You are bad mood",
                "well day": count_well,
                "bad day": count_bad
            }
            return output, 200
        if count_bad <= count_well:
            sql = "UPDATE individual SET Emo='{}' WHERE individualId = '{}';".format(0, IndividualId)
            sql_command(sql)
            output = {
                "message": "You are well mood",
                "well day": count_well,
                "bad day": count_bad
            }
            return output, 200