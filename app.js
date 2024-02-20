// 서버 기본 문법
const express = require('express');
const db = require(__dirname + "/public/dbfile/mysql.js");  // db 연동

const app = express();
const port = 3330;  // 서버 포트 번호

const conn = db.init();

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});

// db 데이터 불러와서 보여줌
app.get('/a', function (req, res) {
    const page = req.query.page || 1;
    const itemsPerPage = 8;    // 페이지 당 아이템 개수
    const offset = (page - 1) * itemsPerPage;

    const sql = "select daytime, theme, name, pnum, agreement from mobileappDB.userinfo_1;";
    conn.query(sql, function (err, result) {
        if (err) {
            console.log("query is not excuted: " + err);
        } else {
            res.send(result);
        }
    });
});

// 전체 페이지 수를 반환하는 라우트
app.get('/totalPages', function (req, res) {
    const itemsPerPage = 8; // 페이지 당 아이템 개수
    const sql = "SELECT COUNT(*) AS total FROM mobileappDB.userinfo_1";
    conn.query(sql, function (err, result) {
        if (err) {
            console.log("Error getting total count: " + err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const totalItems = result[0].total;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        res.json({ totalPages: totalPages }); // JSON 형식으로 응답
    });
});

app.get('/recentData', (req, res) => {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const sql = `SELECT * FROM mobileappDB.userinfo_1 WHERE daytime >= ?`;
    conn.query(sql, [sixHoursAgo], (err, result) => {
        if (err) {
            console.error('Error fetching recent data:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});

// 서버 실행
app.listen(port, function () {
    console.log('서버연결')
});