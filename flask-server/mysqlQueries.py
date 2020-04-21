from .utils import Utils

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


