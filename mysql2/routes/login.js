var express = require('express'); 
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
var router = express.Router(); 
var con;
var db = require('mysql2/promise');

var inform = {
    host : "localhost",
    user : "root",
    password : "password",
    port : 3306,
    database : "test"
};

router.post('/', async function(req, res, next) {
    console.log("REST API Post Method - Member Login And JWT Sign");
	const my_mil_num = req.body.mil_num;
	//var my_name;
    const my_password = req.body.password;
	console.log(my_mil_num+" "+my_password);
    const my_encoded_password = bcrypt.hashSync(my_password, 10);
	console.log(my_mil_num+" "+my_password+" "+my_encoded_password);
	con = await db.createConnection(inform);
	var sql1 = "select * from user_inform where mil_num = '"+my_mil_num+"';";
	console.log(sql1);
	const [row1, field1] = await con.query(sql1);
	if(row1.length==0){
        console.log("없는 계정입니다.");
        res.send("없는 계정입니다.");
    }
    else{
		const real_my_en_pw = row1[0].password;
		if(bcrypt.compareSync(my_password, real_my_en_pw)){
			console.log("로그인 성공");
			const my_name = row1[0].name;
			console.log("내이름 : "+my_name);
        	//res.send("로그인 성공.");
			try {
                const accessToken = await new Promise((resolve, reject) => {
                    jwt.sign({
                            mil_num : my_mil_num,
                            name : my_name
                        },
						"sjh_secret",
                        //config.secret,
                        {
                            expiresIn : '2m'
                        },
                        (err, token) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(token);
                            }
                        });
                });
                res.json({success:true, accessToken:accessToken});
            } catch(err) {
                console.log(err);
                res.status(401).json({success:false, errormessage:'token sign fail'});
            }
		}
		else{
			console.log("로그인 실패");
            res.send("로그인 실패.");
		}
    }
});

module.exports = router;
