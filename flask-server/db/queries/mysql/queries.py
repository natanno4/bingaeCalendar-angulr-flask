from ....utils import Utils,DateTimeEncoder
import json


class MysqlQueries(object):


    def getUserInfo(self,params, conn):
        query = "SELECT id,email,first_name,last_name from users where email = %s"
        try:
            cur = conn.cursor()
            cur.execute(query,params)
            fetch_data = cur.fetchone()
            if fetch_data is None:
              return {'error': False , 'value': None, 'message':"user dosent exist, please sign up."}  
            return {'error': False , 'value':fetch_data, 'message':"ok"} 
        except Exception as err:
            return {'error': True , 'value': None, 'message':str(err)}
        finally:
            cur.close()

    def getUserPassword(self,params, conn):
        query = "SELECT password from users where email = %s"
        try:
            cur = conn.cursor()
            cur.execute(query,params)
            fetch_data = cur.fetchone()
            return {'error': False , 'value':fetch_data['password'],"message":"ok"}  
        except Exception as err:
            return {'error': True , 'value': "error", 'message': str(err)}
        finally:
            cur.close()

    def userRegisteration(self,parmas,conn):
        query = 'INSERT INTO users(email,password,first_name,last_name,phone_number) VALUES(%s,%s,%s,%s,%s)'
        try:
            cur = conn.cursor()
            cur.execute(query, parmas)
            if cur.rowcount:
                conn.commit()
                return {'error': False , 'value':True, 'message': 'successfully registered'}
            else:
                return {'error': True , 'value':None, 'message':"error"}     
        except Exception as err:
            return {'error': True , 'value':None, 'message':str(err)}
        finally:
            cur.close()


    def setEvents(self,parmas,conn):
        query = 'INSERT INTO events(user_id, date, start_time, end_time, type, discription, title, watch_platform) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)'
        try:
            cur = conn.cursor()
            cur.execute(query, parmas)
            if cur.rowcount:
                conn.commit()
                return {'error': False , 'value':True, 'message': 'event has been saved successfully'}
            else:
                return {'error': True , 'value':None, 'message':"error"}     
        except Exception as err:
            return {'error': True , 'value':None, 'message':str(err)}
        finally:
            cur.close()

    def deleteEvent(self,parmas,conn):
        query = 'DELETE from events where event_id = %s'
        try:
            cur = conn.cursor()
            cur.execute(query, parmas)
            if cur.rowcount:
                conn.commit()
                return {'error': False , 'value':True, 'message': 'event has been deleted successfully'}
            else:
                return {'error': True , 'value':None, 'message':"error"}     
        except Exception as err:
            return {'error': True , 'value':None, 'message':str(err)}
        finally:
            cur.close()
            
    def getWeeklyEvent(self,parmas,conn):
        query = 'select * from events where date between %s and %s  order by date'
        try:
            cur = conn.cursor()
            cur.execute(query, parmas)
            fetch_data = cur.fetchall()
            if fetch_data is None:
              return {'error': False , 'value': None, 'message':"no events"}
            else:    
              return {'error': False , 'value': json.dumps(fetch_data, cls=DateTimeEncoder), 'message':"ok"}   
        except Exception as err:
            return {'error': True , 'value':None, 'message':str(err)}
        finally:
            cur.close()                          


