function AddNewDeviceType(req, resp){
    ClearBlade.init({request:req});
    var collections = ClearBlade.Collection({collectionName: DEVICE_TYPE_COLLECTION_NAME});
    var newDeviceTypes = req.params.newDeviceType;
   
    var rows = [];
    for(var i in newDeviceTypes){
        var col = {};
        if(!isValidName(newDeviceTypes[i])){
            continue;
        }
        col["type"] = newDeviceTypes[i]; 
        rows.push(col);
    }
    
    if(!rows || rows.length===0){
        resp.error("Missing Parameters");
    }
    else{
        collections.create(rows, function(err, r){
            if(err){
                log(err);
                resp.error(err);
            }
            else{
                log(r);
                resp.success(r);
            }
        });
    }
}