function GetTypeSchema(req, resp){
    ClearBlade.init({request:req});
    var collections = ClearBlade.Collection({collectionName: DEVICE_TYPE_COLLECTION_NAME});
    var deviceType = req.params.deviceType;
   	var queryDefault = ClearBlade.Query();
	var queryInput = ClearBlade.Query();
	
	queryInput.equalTo('type',deviceType);
	queryDefault.equalTo('type',"default");
	var finalQuery = queryInput.or(queryDefault);
    var getTypeSchemaResponse;

    collections.fetch(finalQuery, function(err, r){
        if(err){
            resp.error(err);
        }
        else{
            if(r.DATA.length>1){
                removeDefaultDeviceType(r);
            }
            getTypeSchemaResponse = r;
            var s = r.DATA[0].schema;
            if(!s || s.length===0){
                resp.error("Schema Empty/Not defined");
            }
            else{
                resp.success(r);
            }
        }
    });
    
}

var removeDefaultDeviceType = function(r){
    r.DATA = r.DATA.filter(function( obj ) {
        return obj.type !== 'default';
    });
}