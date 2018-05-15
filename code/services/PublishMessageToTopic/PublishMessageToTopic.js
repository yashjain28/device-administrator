function PublishMessageToTopic(req, resp){
    ClearBlade.init({request:req});
    var messaging = ClearBlade.Messaging();
    var payload = JSON.stringify(req.params.payload);
    var topic = req.params.messageTopic;
    
    messaging.publish(topic, payload);
    resp.success({
        message:req.params.payload
    });
    
}