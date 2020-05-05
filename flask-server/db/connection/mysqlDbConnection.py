from flask import g
import pymysql
from .db_connection import DbConnection

class MysqlDbConnection(DbConnection):
    def __init__(self):
        self._config = {'user' : 'nf', 'password' : '12341234b',
'host': 'localhost' ,'database' : 'binge-calendar-db'}

    def db_connecet(self):
        return pymysql.connect(
        user = self._config['user'], password = self._config['password'], database = self._config['database'], 
        host = self._config['host'], 
        cursorclass = pymysql.cursors.DictCursor)
