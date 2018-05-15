var platformURL = "https://staging.clearblade.com";
var developer_token;
function UpdateDeviceTypeSchema(req, resp){
    var authDeveloper = function() {
    req.params.developer_email = DEVELOPER_EMAIL;
    req.params.developer_password = DEVELOPER_PASSWORD;
        var options = {
            "headers":{
                "ClearBlade-SystemKey":req.systemKey,
                "ClearBlade-SystemSecret":req.systemSecret
            },
            uri: platformURL+"/admin/auth/",
            body: {"email":req.params.developer_email,"password":req.params.developer_password}
        };
        var requestObject = Requests();
        requestObject.post(options, function(err,httpresponse) {
            if (err !== false){
                resp.error(err);
            }
             else {
               developer_token = httpresponse.dev_token
               httpresponse = JSON.parse(httpresponse)
               UpdateDeviceTableColumns(req, resp, httpresponse.dev_token);
            }
            
        });
    }
    authDeveloper();
    
}

function UpdateDeviceTableColumns(req, resp, dev_token){
    var url = [platformURL,"api/v/3/devices", req.systemKey,"columns"].join('/');
    var requestOptions = {
        "url":url,
        "headers":{
        "ClearBlade-UserToken":req.userToken
        }
    }
    var callback = function (err, deviceColumns) {
        if (err) {
        	resp.error(err);
        } else {
            deviceTableColumnsMap = {};
            deviceColumns = JSON.parse(deviceColumns);
            for (var i=0;i<deviceColumns.length;i++) {
                var col = deviceColumns[i];
                deviceTableColumnsMap[col.ColumnName] =  col.ColumnType;
            }
            modifyForNewAttribute(req, resp, deviceTableColumnsMap,  dev_token);
        }
    }
    
    var http = Requests();
    
    http.get(requestOptions, callback);
}

function modifyForNewAttribute(req, resp, deviceTableColumnsMap, dev_token){
    ClearBlade.init({request:req});
    
    var deviceSchema = req.params.updatedSchema;
    var collections = ClearBlade.Collection({collectionName: "DeviceTypes"});
    var query = ClearBlade.Query();
    var deviceType = req.params.deviceType;
    
    query.equalTo('type',deviceType);
    
    var changes = {
        "schema":req.params.updatedSchema
    }
    collections.update(query, changes, function(err, r){
        if(err){
            log(err);
            resp.error(err);
        }
        else{
            log(r);
            resp.success("Success");
        }
    });
    
    var callback = function (err, r) {
        if (err) {
            log(r);
            //resp.error(err);
        }
        else {
            log(r);
        }
    };
  
    deviceSchema = JSON.parse(deviceSchema);
    for(var i in deviceSchema){
        if(deviceSchema.hasOwnProperty(i)){
           if(!deviceTableColumnsMap[i]){
               addToDeviceTable(req, deviceSchema, i, dev_token, callback);
           }
        }
    }
    
    
}

function addToDeviceTable(req, deviceSchema, i, dev_token){
    var url = [platformURL,"api/v/1/code", req.systemKey,"AddColumnsToDeviceTable"].join('/');
    var type = deviceSchema[i];
    var column_name = i;
    var requestOptions = {
        "url":url,
        "headers":{
        "ClearBlade-DevToken":dev_token
        },
        "body":{
                type,
                column_name
        }
    }
    
    var http = Requests();

    http.post(requestOptions, function(err, r){
        if(err){
            resp.error(r);
        }
        log(r);
    });
    
}


