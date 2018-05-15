function fetchMesageHistoryForDevice(req, resp){
        ClearBlade.init({request:req});
        var messaging = ClearBlade.Messaging();
        var sinceCurrTimeInSeconds = parseInt(Date.now()/1000);
        var topic = req.params.messageTopic;
        var numberOfMessagesBeforeTimeStamp = 0; // 0 for all
        messaging.getMessageHistory(topic,sinceCurrTimeInSeconds, numberOfMessagesBeforeTimeStamp, function(err, r){
            if(err){
                resp.error(err);
            }
            else{
                resp.success(r);
            }
        });

}