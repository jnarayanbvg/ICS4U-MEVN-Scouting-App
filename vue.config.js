const path = require('path');

//Set the static folder build directory to server/public
//Set up a proxy so the database localhost can be referenced as an extension of the client
module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: 'http://localhost:5000'
            }
        }
    }
};