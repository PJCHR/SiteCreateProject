const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');
const helmet = require('helmet');
const crypto = require('crypto');
const key = JSON.parse(fs.readFileSync('./key.json'));
const jwt = require('jsonwebtoken');
const jwtJSON = JSON.parse(fs.readFileSync("./jwt.json"));

var cookieParser = require('cookie-parser');

app.use(cors());
app.use(helmet({contentSecurityPolicy: false,}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var data = fs.readFileSync('./database.json')
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
  dateStrings: 'date'
})
connection.connect();

app.get('/home', (req, res) => {
  const sql = 'SELECT * FROM product_info';
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DATA GET FAIL');
    } else {
      console.log('DATA GET Home');
      res.send(rows);
    }
  });
});
app.get('/search', (req, res) => {
  const textName = req.query.name;
  const sql = `SELECT * FROM product_info WHERE pdt_name LIKE '%${textName}%'`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DB SEARCH FAIL');
    } else {
      res.send(rows);
    }
  });
});
app.post('/cscenter=board_list', (req, res) => {
  const sql = `SELECT * FROM cs_board_info`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DATA GET FAIL');
    } else {
      res.send(rows);
    }
  });
});
app.post("/cscenter=write_board-save", (req, res) =>{
  const id = req.body.id; 
  const nickname = req.body.nickname;
  const subject = req.body.radioValue;
  const title = req.body.title; 
  const content = req.body.content;
  const con = content.slice(3, -4);
  const date_created = req.body.date_created;
  const hit = req.body.hit;
  const look_post = req.body.check; 

  const sql = `INSERT INTO cs_board_info (id, nickname, subject, title, content, date_created, hit, look_post) VALUES ('${id}','${nickname}','${subject}','${title}','${con}','${date_created}','${hit}','${look_post}')`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
  }
  else {
      res.send(rows);
      console.log("data save")
  }
  });
});
app.post("/cscenter=board_list_read", (req, res)=>{
  const text = req.query.idx;
  const sql = `SELECT * FROM cs_board_info WHERE idx LIKE ${text}`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DATA GET FAIL');
    } else {
      res.send(rows);
    }
  })
})
app.post("/cscenter=board_list_fix", (req, res)=>{
  const text = req.query.idx;
  const sql = `SELECT * FROM cs_board_info WHERE idx LIKE ${text}`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DATA GET FAIL');
    } else {
      res.send(rows);
    }
  })
})
app.post("/cscenter=board_list_read-delete", (req, res) =>{
  const text = req.query.idx;
  const sql = `DELETE FROM cs_board_info WHERE idx = ${text}`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
  }
  else {
      res.send(rows);
  }
  });
});
app.post("/cscenter=write_board-fix", (req, res) =>{
  const text = req.query.idx;
  const subject = req.body.radioValue;  
  const title = req.body.title; 
  const content = req.body.content; 
  const con = content.slice(3, -4);
  const date_created = req.body.date_created;
  const look_post = req.body.check; 
  const sql = `UPDATE cs_board_info SET subject = '${subject}', title = '${title}', content = '${con}', date_created = '${date_created}', look_post = '${look_post}' WHERE idx= ${text}`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
  }
  else {
      res.send(rows);
  }
  });
});
app.get('/idcheck', (req, res) => {
  const { id } = req.query;
  const sql = `SELECT 'exits' FROM customer_info WHERE id="${id}"`;
  connection.query(sql, (err, rows, field) => {
    if (err) {
        console.log(err);
    }
    else {
        res.send(rows);
    }
  });
});
app.post('/register', (req, res) => {
  const Id = req.body.id;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.pw).digest('base64'); //암호화,
  const Email = req.body.email;
  const NICKNAME = req.body.nickname;
  const PHONE = req.body.phone;
  const DATE = req.body.date_created;
  const sql = `INSERT INTO customer_info (id, pw, nickname, email, phone, date_created) VALUES ('${Id}', '${Pw}', '${NICKNAME}', '${Email}', '${PHONE}', '${DATE}')`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DB SAVE FAIL');
    } else {
      res.send(rows);
    }
  });
});
// token 에서 유저 id를 가져와서 id와 일치하는 고객의 비밀번호와 일치하면 이동 요청
app.post('/pwcheck', (req, res) => {
  const Id = req.body.logined_ID;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64'); //암호화,
  let customerInfo = '';
  console.log(Id);console.log(Pw);
  const sql = `SELECT * FROM customer_info WHERE id='${Id}' AND pw='${Pw}'`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    else {
      customerInfo = rows;
      console.log(customerInfo);
      if (customerInfo.length == 1) {
        res.send({ success: "true" });
      }
      else if (customerInfo.length != 1) {
        res.send({ success: "false" })
      }
    }
  })
});

app.post('/login', (req, res) => {
  const Id = req.body.inputId;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64'); //암호화,
  let customerInfo = [];
  const sql = `SELECT * FROM customer_info WHERE id='${Id}' AND pw='${Pw}'`;
  connection.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    }
    else {
      customerInfo = rows;
      if (customerInfo.length == 1) {
        let token = jwt.sign({
          id: customerInfo[0].id,
          nickname: customerInfo[0].nickname,
          // 토큰의 내용(payload)
        },
        jwtJSON.secret,    // 비밀 키
        {
          // expiresIn: '5m'    // 유효 시간은 5분
        }
        )
        res.cookie("user", token);
        res.send({ success: "true" });
      }
      else if (customerInfo.length != 1) {
        res.send({ success: "false" })
      }
    }
  })
}); // => 로그인
app.post('/customerinfo', (req, res) => {
  const Id = req.body.userId;
  const sql = `SELECT * FROM customer_info WHERE id='${Id}'`;
  connection.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(rows);
    }
  })
});
app.post('/customerinfo-change', (req, res) => {
  const Id = req.body.userId;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.pw).digest('base64'); //암호화,
  const Email = req.body.email;
  const NICKNAME = req.body.nickname;
  const PHONE = req.body.phone;
  const DATE = req.body.date_change;
  console.log(Id,Pw,Email,NICKNAME,PHONE,DATE);
  const sql = `UPDATE customer_info SET pw = '${Pw}', email = '${Email}', nickname = '${NICKNAME}', phone = '${PHONE}', date_change = '${DATE}' WHERE id= '${Id}'`;
  connection.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send(rows);
    }
  })
});
app.delete('/logout',(req,res)=>{
  res.clearCookie('user').send(req.cookies.name);
 });

app.get('/authority', (req, res) => {
  let token = req.cookies.user;

  try{
    let decoded = jwt.verify(token, jwtJSON.secret);
    res.send(
      {
        status: 'login',
        id: decoded.id,
        name: decoded.nickname,
      }
    )
  }
  catch(err){
    res.send({status:'logout'})
    if(status == 'logout'){
      res.clearCookie('user').send(req.cookies.name);
    }
  }
}); // => 권한확인
 
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all request to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
}
 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`The server is running on PORT ${PORT}`);

// connection.end();
