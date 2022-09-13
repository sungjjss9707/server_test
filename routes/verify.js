var express = require('express'); 
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
var router = express.Router(); 
var mysql = require('../config')
var inform = mysql.inform;
var con;

router.post('/', async function(req, res, next) {
    //const accessToken = req.body.token; 
	const accessToken = req.header('Access_Token');
	if (accessToken == null) {
		res.status(403).json({success:false, errormessage:'Authentication fail'});
	} else {
		try {
			const tokenInfo = await new Promise((resolve, reject) => {
				jwt.verify(accessToken, config.secret, 
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
