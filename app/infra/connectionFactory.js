var mysql = require('mysql');
function createDbConnection() {
    var connection ;
    if(!process.env.NODE_ENV){
        connection = mysql.createConnection({
            host: 'localhost_adsad',
            user: 'adilson',
            port: 3306,
            password: '',
            database: 'casadocodigo',
            insecureAuth: true
        });    
    }

    if(process.env.NODE_ENV=="test"){
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'adilson',
            port: 3306,
            password: '',
            database: 'casadocodigo_teste',
            insecureAuth: true
        });    
    }

    return connection;
}

module.exports = () => {
    return createDbConnection;
}