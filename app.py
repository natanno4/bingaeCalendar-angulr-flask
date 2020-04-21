from flask import Flask,jsonify, request
from flask_cors import CORS
import json
import os
import sys
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash
from flask_mysqldb import MySQL 


app = Flask(__name__)
#mysql config
app.config["MYSQL_HOST"] = 'localhost'
app.config['MYSQL_USER'] = 'nf'
app.config['MYSQL_PASSWORD'] = '12341234b'
app.config['MYSQL_DB'] = 'binge-calendar-db'


db = MySQL(app)


@app.route("/api/getUser",methods= ["GET"])
def getUserById():
    if request.method == "GET":
        id = request.args.get("id")
        try:
            conn =  db.connection
            cur = conn.cursor()
            cur.execute("select * from users where id = %s",(id))
            fetch_data = cur.fetchall()
            row_headers=[x[0] for x in cur.description]
            json_data=[]
            for result in fetch_data:
                json_data.append(dict(zip(row_headers,result)))
            return jsonify(error = 'false' , value =(json_data))
        except() as e:
            return jsonify(error = 'true' , value = e)
        finally:
            cur.close()
            #conn.close()



@app.route("/api/register",methods= ["POST"])
def registration():
    if request.method == "POST":
        req = request.form
        email = req.get("email")
        password = req.get("password")
        firstName = req.get("first_name")
        lastName = req.get("last_name")
        if email is None or password is None or firstName is None or lastName is None:
              return jsonify(error = 'true' , value ="none", message = "missing information")
        checkUser = checkIfUserExist(email)
        if checkUser['error'] is 'true':
            return checkUser
        if checkUser['value'] is 'dont_exist':
            encrPassword = generate_password_hash(password)
            return jsonify(userRegisteration(email,encrPassword,firstName,lastName))  
        else:
            return jsonify(error = 'false' , value ="none", message = "faild to register, user exist")             


@app.route("/api/login",methods= ["POST"])
def login():
    if request.method == "POST":
        req = request.form
        email = req.get("email")
        password = req.get("password")
        if email is None  or password is None:
             return jsonify(error = 'true' , value ="none", message = "faild to connect, incorrect email or password")
        checkUser = checkIfUserExist(email)
        if checkUser['error'] is 'true':
            return jsonify(checkUser)
        if checkUser['value'] is 'exist':
                pass_container = getUserPassword(email)
                if pass_container['error'] is 'true':
                    return jsonify(pass_container)
                if check_password_hash(pass_container['value'], password):
                    return jsonify(error = 'false' , value ="none",message = "successfully connected")
                else:
                     return jsonify(error = 'false' , value ="none", message = "faild to connect, incorrect password") 
        else:
             return jsonify(error = 'false' , value ="none", message = "faild to connect, incorrect email")                


def checkIfUserExist(email):
    try:
        conn =  db.connection
        cur = conn.cursor()
        cur.execute("SELECT EXISTS(SELECT 1 FROM users WHERE email = %s)"
        ,(email,))
        fetch_data = cur.fetchone()
        if fetch_data[0]:
            return {'error': 'false' , 'value':'exist'}
        else:
            return {'error': 'false' , 'value':'dont_exist'}   
    except:
        return {'error': 'true' , 'value':'error'}
    finally:
        cur.close()
        #conn.close()

def getUserPassword(email):
    try:
        conn = db.connection
        cur = conn.cursor()
        cur.execute("SELECT password from users where email = %s"
        ,(email,))
        fetch_data = cur.fetchone()
        return {'error': 'false' , 'value':fetch_data[0]}  
    except:
        return {'error': 'true' , 'value': sys.exc_info()[0]}
    finally:
        cur.close()
        #conn.close()

def getUserInfo(email):
    try:
        conn =  db.connection
        cur = conn.cursor()
        cur.execute("SELECT id,first_name,last_name from users where email = %s"
        ,(email,))
        fetch_data = cur.fetchone()
        return {'error': 'false' , 'value':fetch_data[0]} 
    except:
        return {'error': 'true' , 'value':'error'}
    finally:
        cur.close()
        #conn.close


def userRegisteration(email,password,firstName,lastName):
    try:
        conn =  db.connection
        cur = conn.cursor()
        cur.execute('INSERT INTO users(email,password,first_name,last_name) VALUES(%s,%s,%s,%s)',
        (email,password,firstName,lastName))
        if cur.rowcount:
            conn.commit()
            return {'error': 'false' , 'value':"none", 'message': 'successfully registered'}
        else:
            return {'error': 'true' , 'value':'error'}     
    except:
        return {'error': 'true' , 'value':'error'}
    finally:
        cur.close()         

if __name__ == "__main__":
    app.run(debug = True)