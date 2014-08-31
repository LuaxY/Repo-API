exports.isEmpty = function(obj) {
    if(obj == null) { return true; }
    if(typeof obj == 'object') { return !Object.keys(obj).length; }
    return false;
}

exports.update = function(current, update) {
    if (!update || update == '' || update == current) { return current; }
    return update;
}