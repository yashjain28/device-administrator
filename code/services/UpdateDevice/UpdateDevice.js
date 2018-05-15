function UpdateDevice(req, resp){
    ClearBlade.init({request:req});
    
    var dev = ClearBlade.Device();
    var query = ClearBlade.Query();
    var name = req.params.deviceInfo.name;
    delete req.params.deviceInfo.name;
    delete req.params.deviceInfo.system_key;
    query.equalTo("name", name);
  
    dev.update(query, req.params.deviceInfo,  function (err, r) {
        if (err) {
        	resp.error(r);
        } else {
        	resp.success(r);
        }
    });

}