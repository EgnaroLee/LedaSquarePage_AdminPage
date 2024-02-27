var mysql = require("mysql2");

var db_info = {
    host: 'database-1.c3h8wpy3mw6o.us-east-1.rds.amazonaws.com',
    port:3306,
    user: 'admin',
    password: 'a1234567',
    database: 'mobileappDB'

};



 
module.exports = {
    init: function(){
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err){
            if(err) console.error("mysql connection error: " + err);
            else console.log("mysql is connected!");
        });
    },
};
