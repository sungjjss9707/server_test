var express = require('express'); 
var bcrypt = require('bcrypt');
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

	async function myinsert(insert_sql){
        try{
			console.log(insert_sql);
            const [row1, field1] = await con.query(insert_sql);
            return true;
        }catch(error){
            console.log("이미 가입된 군번입니다");
			res.send("이미 가입된 군번입니다.");
			return false;
        }
    }

	con = await db.createConnection(inform);
	const my_mil_num = req.body.mil_num;
    const my_password = req.body.password;
	const my_name = req.body.name;
	const my_sadan = req.body.sadan;
	const my_encoded_password = bcrypt.hashSync(my_password, 10);
	console.log(my_password+" "+my_encoded_password);
	var sql1 = "insert into user_inform values ('"+my_mil_num+"', '"+my_encoded_password+"', '"+my_name+"', '"+my_sadan+"');"
	var do_insert = await myinsert(sql1);
	if(do_insert) res.send("가입 완료");
	console.log("가입완료");
	//console.log(sql1);
	//const [row1, field1] = await con.query(sql1);
	//console.log(row1);
    //console.log(memberId+" "+memberPassword);
});

router.get('/', async function(req,res){
	
	con = await db.createConnection(inform);
    var sql1 = "select * from user;";
    var user_id, user_sadan;
	async function myfunction(){
		try{
			const [row1, field1] = await con.query(sql1);
			console.log("user 테이블 크기 : "+row1.length);
			if(row1.length==0){
				console.log("빈 테이블입니다");
				res.send("fail");
			}
			else{
				user_id = row1[0].sadan_num;
           		console.log(row1[0].id);
            	console.log("1번함수 실행 완료");
            	var sql2 = "select * from sadan where num = '"+user_id+"';";
            	const [row2, field2] = await con.query(sql2);
            	console.log(row2[0]);
			}
		}catch(error){
			console.log(error);
		}
	}
	myfunction();
});

module.exports = router;
