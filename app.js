// 서버 기본 문법
const express = require('express');
const app = express();
const port = 3330;  // 서버 포트 번호
const db = require(__dirname + "/public/dbfile/mysql.js");  // db 연동
const conn = db.init();


// app.listen() 서버 실행 함수
app.listen(port, function(){
    console.log('서버연결')
});

app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/html/index.html');
  
});

// db 데이터 불러와서 보여줌
app.get('/a',function(req, res){
    var sql = "select daytime, theme, name, pnum, agreement from mobileappDB.userinfo_1;";
    conn.query(sql, function(err, result){
        if(err){
            console.log("query is not excuted: " + err);
        }
        else{
            res.send(result);
        }
    });
});




