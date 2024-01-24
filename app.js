// 서버 기본 문법
const express = require('express');
const app = express();
const port = 3330;  // 서버 포트 번호


// app.listen() 서버 실행 함수

app.listen(port, function(){
    console.log('서버연결')
});


app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/html/index.html')
});


app.use(express.static('public'));