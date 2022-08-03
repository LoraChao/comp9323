from unittest import result
import pymysql
from config import *

def sql_command(command):
    db = pymysql.connect(
        host=DB_URL,
        port=DB_PORT,
        user=DB_ACCOUNT,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8'
    )
    c = db.cursor()
    c.execute(command)
    result = c.fetchall()
    db.commit()
    db.close()
    return result

def sql_dicresult_with_decription(command):
    db = pymysql.connect(
        host=DB_URL,
        port=DB_PORT,
        user=DB_ACCOUNT,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8'
    )
    c = db.cursor()
    c.execute(command)
    sql_result = c.fetchall()
    cols = c.description
    col=[]
    for v in cols:
        col.append(v[0])
    db.commit()
    db.close()
    result = []
    if len(sql_result) >= 1:
        for e in sql_result:
            result.append(one_result_package(col,e))
        return result

def one_result_package(keys,values):
    result = {}
    for m,n in zip(keys,values):
        result[m] = n
    return result

def search_list(str,list_input):
    db = pymysql.connect(
        host=DB_URL,
        port=DB_PORT,
        user=DB_ACCOUNT,
        password=DB_PASSWORD,
        database=DB_NAME,
        charset='utf8'
    )
    c = db.cursor()
    c.execute(str, list_input)
    result = c.fetchall()
    db.commit()
    db.close()
    return result

def output_list(res, label_name):
    output_tmp = {}
    output_res = []
    for i in res:
        for m in range(len(label_name)):
            output_tmp[label_name[m]] = i[m]
        output_res.append(output_tmp)
        output_tmp = {}
    return output_res

