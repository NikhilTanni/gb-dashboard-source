
module.exports.respJson = function(status, message, data) {
  var jsonMsg = {
    status: status,
    timestamp: new Date().toISOString(),
    message: message,
    data: data
  }
  return jsonMsg;
}