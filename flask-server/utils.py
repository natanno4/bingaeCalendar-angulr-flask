

class Utils(object):
    def setResponseKeyToValues(keys, values):
        row_headers=[x[0] for x in keys]
        json_data=[]
        if not isinstance(values, list) :
            return dict(zip(row_headers,values))
        for result in fetch_data:
            json_data.append(dict(zip(row_headers,result)))
        return json_data    

