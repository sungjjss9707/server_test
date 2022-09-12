var express = require('express'); 
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
var router = express.Router(); 
/*
var con;
var db = require('mysql2/promise');
var inform = {
    host : "localhost",
    user : "root",
    password : "password",
    port : 3306,
    database : "test"
};
*/
router.post('/', async function(req, res, next) {
    const accessToken = req.body.token; 
	if (accessToken == null) {
		res.status(403).json({success:false, errormessage:'Authentication fail'});
	} else {
		try {
			const tokenInfo = await new Promise((resolve, reject) => {
				jwt.verify(accessToken, "sjh_secret", 
					(err, decoded) => {
						if (err) {
							reject(err);
						} else {
							resolve(decoded);
						}
					});
			});
			console.log("인증성공");
			res.send("인증성공");
		} catch(err) {
			//console.log(err);
			console.log("인증실패");
			res.status(403).json({success:false, errormessage:'Authentication fail'});
		}
	}
});

module.exports = router;
