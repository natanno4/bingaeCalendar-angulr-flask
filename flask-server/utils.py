from datetime import datetime, timedelta, date 
import json

class Utils(object):
    def setResponseKeyToValues(self, keys, values):
        row_headers=[x[0] for x in keys]
        json_data=[]
        if not isinstance(values, list) :
            return dict(zip(row_headers,values))
        for result in fetch_data:
            json_data.append(dict(zip(row_headers,result)))
        return json_data    


class DateTimeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime) or isinstance(o,date):
            return o.isoformat()
        if isinstance(o, timedelta):
            return str(o)
        return json.JSONEncoder.default(self, o)
