from flask import Blueprint,jsonify, request,g
from .mysqlDbConnection import DbConnection
from .mysqlQueries import MysqlQueries
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

api = Blueprint('api', __name__)


@api.route("/api/login",methods= ["POST"])
def login():
    if request.method == "POST":
        req = request.form
        email = req.get("email")
        password = req.get("password")
        if email is None  or password is None:
             return jsonify(error = 'true' , value ="none", message = "Incorrect username or password.")
        db = DbConnection()
        queries = MysqlQueries()
        checkUser = queries.getUserInfo((email,), db.get_db())
        if checkUser['error'] or checkUser['value'] is None:
            a = jsonify(checkUser)
            return a
        user_info = checkUser['value']
        pass_container = queries.getUserPassword((email,), db.get_db())
        if pass_container['error']:
            return jsonify(pass_container)
        if check_password_hash(pass_container['value'], password):
            return jsonify(error = False , value =user_info, message = "successfully connected")
        else:
            return jsonify(error = False , value =None, message = "Incorrect username or password.") 


@api.route("/api/register",methods= ["POST"])
def registration():
    if request.method == "POST":
        req = request.form
        email = req.get("email")
        password = req.get("password")
        firstName = req.get("first_name")
        lastName = req.get("last_name")
        phone = req.get("phone_number")
        if email is None or password is None or firstName is None or lastName is None:
              return jsonify(error = True , value =None, message = "missing information")
        db = DbConnection()
        queries = MysqlQueries()
        checkUser = queries.getUserInfo((email,), db.get_db())
        if checkUser['error']:
            return checkUser
        if checkUser['value'] is None:
            encrPassword = generate_password_hash(password)
            return jsonify(queries.userRegisteration((email,encrPassword,firstName,lastName,phone), db.get_db()))  
        else:
            return jsonify(error = False , value =None, message = "faild to register, user exist")             
            