from flask import g

class DbConnection(object):
    def __init__(self):
        pass

    def db_connecet(self):
        pass

    def db_disconnect():
        if hasattr(g, 'db'):
            g.db.close() 

    def get_db(self):   
        if not hasattr(g, 'db'):
            g.db = self.db_connecet()
        return g.db 