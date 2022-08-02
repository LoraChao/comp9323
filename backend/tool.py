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
    if len(sql_result) > 1:
        for e in sql_result:
            result.append(one_result_package(col,e))
        return result
    else:
        return one_result_package(col,sql_result[0])

def one_result_package(keys,values):
    result = {}
    for m,n in zip(keys,values):
        result[m] = n
    return result


