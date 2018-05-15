function DeleteMessageFromHistory(req, resp){
    ClearBlade.init({request:req});
    var messaging = ClearBlade.Messaging();
    var topic = req.params.messageTopic;
    var deleteBasedOnTimeStamp = req.params.timeStampToDelete;
        
    messaging.getAndDeleteMessageHistory(topic, 1, deleteBasedOnTimeStamp, deleteBasedOnTimeStamp, deleteBasedOnTimeStamp,function(err, r){
        if(err){
            resp.error(err);
        }
        else{
            resp.success(r);
        }
    });
}