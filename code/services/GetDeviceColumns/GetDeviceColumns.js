function GetDeviceColumns(req, resp){
    var url = [PLATFORM_URL,"api/v/3/devices", req.systemKey,"columns"].join('/')
    var requestOptions = {
        "url":url,
        "headers":{
            "ClearBlade-UserToken":req.userToken
        }
    }
    
    var http = Requests();
    http.get(requestOptions, function (err, r) {
        if (err) {
        	resp.error(r);
        } else {
            resp.success(r);
        }
    });

}