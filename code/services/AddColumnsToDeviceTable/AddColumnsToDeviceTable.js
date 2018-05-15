function AddColumnsToDeviceTable(req, resp){
    var apiEndpoint = "admin/devices/"+ req.systemKey +"/columns";
    var url = [PLATFORM_URL, apiEndpoint].join('/');
    var column_name = req.params.column_name, type=req.params.type;
    
    if(!isValidColumnType(type) || !isValidName(column_name)){
        resp.error("Invalid column name or type");
    }
    else{
        var http = Requests();
        
        var requestOptions  = {
            url,
            headers:{
                "ClearBlade-DevToken":req.userToken
            },
            body:{
                type,
                column_name
            }
        }
        
        http.post(requestOptions, function(err, r){
            if(err){
                resp.error(r);
            }
            else{
                resp.success(r);
            }
        });
    }
}