function isValidColumnType(type){
    if(!type || typeof(type) !== "string" || !validTypes[type]){
            return false;
    }
    return true;
}

function isValidName(name){
    var regex = /[a-zA-Z][a-zA-Z0-9-_]*$/;
    if(!name || typeof(name) !== "string" || !regex.test(name)){
            return false;
    }
    return true;
}