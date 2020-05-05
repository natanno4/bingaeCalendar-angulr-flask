from flask import Flask,jsonify, request,g
from flask_cors import CORS
import json
import os
import sys
from .appRequests.userAuthorization.userAppRequests import api




app = Flask(__name__)
CORS(app)
app.register_blueprint(api)
     


@app.teardown_appcontext
def close_db(error):
    '''Closes the database connection at the end of request.'''    
    if hasattr(g, 'db'):
        g.db.close()


if __name__ == "__main__":
    app.run(debug = True)