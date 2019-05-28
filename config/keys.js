// keys.js - figure out what set of creditentials to return
if(process.env.NODE_ENV === 'production') {
  // we are in prod - return prod set of keys
  module.exports = require('./prod');
}
else {  
  // we are in dev - return dev keys
  module.exports = require('./dev');
}

// production remote db
// 7GMFTMGBfrV4yk1t
// mongodb+srv://emailprod:7GMFTMGBfrV4yk1t@cluster0-ttn62.mongodb.net/test?retryWrites=true
