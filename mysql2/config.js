var mysql = require('mysql2/promise');
/*
var mysql = require('mysql2/promise');
var db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    port : 3306,
    database : "test"
});
*/
/*
var db = async()=>{
	try{
		var con = await mysql.createConnection({
        	host : "localhost",
        	user : "root",
        	password : "password",
        	port : 3306,
         	database : "test"
    	});
	}catch(error){
		console.log(error);
	}
}
*/


/*
	var con = await mysql.createConnection({
		host : "localhost",
    	user : "root",
    	password : "password",
    	port : 3306,
   		 database : "test"
	});
}

var db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    port : 3306,
    database : "test"
});


db.connect();
*/

module.exports = {
    'secret' : '005c9780fe7c11eb89b4e39719de58a5'
};
