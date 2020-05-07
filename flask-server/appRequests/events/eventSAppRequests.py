from flask import Blueprint,jsonify, request,g
from ...db.queries.mysql.queries import MysqlQueries
from ...db.connection.mysqlDbConnection import MysqlDbConnection
from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

events_api = Blueprint('events_api', __name__)


@events_api.route("/api/setEvent",methods= ["POST"])
def setEvent():
    if request.method == "POST":
        req = request.form
        user_id = req.get("user_id")
        date = req.get("date")
        start_time = req.get("start_time")
        end_time = req.get("end_time")
        content_type = req.get("type")
        discription = req.get("discription")
        title = req.get("title")
        watch_platform = req.get("watch_platform")
        if user_id is None or date is None or start_time is None or end_time is None or content_type is None \
        or discription is None or title is None or watch_platform is None:
            return jsonify(error = 'true' , value ="none", message = "Incorrect values.")
        db = MysqlDbConnection()
        queries = MysqlQueries()
        return queries.setEvents((user_id, date, start_time, end_time, content_type, discription, title, watch_platform),
        db.get_db())

@events_api.route("/api/deleteEvent",methods= ["POST"])
def deleteEvent():
    if request.method == "POST":
        req = request.form
        event_id = req.get("event_id")
        if event_id is None:
            return jsonify(error = 'true' , value ="none", message = "Incorrect value.")
        db = MysqlDbConnection()
        queries = MysqlQueries()
        return queries.deleteEvent((event_id,), db.get_db())         
  




        