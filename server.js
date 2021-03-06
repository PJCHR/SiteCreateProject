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
app.get("/itemApi", (req,res)=>{
  const { item } = req.query;
  const sql = `SELECT * FROM product_info WHERE num=${item}`;
  connection.query(sql,(err, result, field) =>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
      }
  })
});
app.post("/orderaction", (req,res)=>{
  var user = req.body.authority.id;
  
  const sql = `SELECT num, id, nickname, addr, phone FROM customer_info WHERE id='${user}'`;
  connection.query(sql,(err, result, field) =>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
      }
  })
});
app.post("/importItem", (req,res)=>{
  var num = req.body.itemNo;
  
  const sql = `SELECT * FROM product_info WHERE num=${num}`;
  connection.query(sql,(err, result, field) =>{
      if(err){
        console.log(err);
      }
      else{
        res.send(result);
      }
  })
});
app.post("/cart", (req,res)=>{
  var num=req.body.result[0].num;
  var pdt_name=req.body.result[0].pdt_name;
  var pdt_price=req.body.result[0].pdt_price;
  var imgsource=req.body.result[0].imgsource;
  var count=req.body.count;
  var id = req.body.authority.id;
  const sql = `INSERT INTO shoppingCart (num, id, pdt_name, pdt_price, count, imgsource) VALUES (${num}, '${id}', '${pdt_name}', ${pdt_price}, ${count}, '${imgsource}')`;
  connection.query(sql, (err, result, field) => {
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  });
});

app.post("/mycart", (req,res)=>{
  var id = req.body.authority.id;
  const sql = `SELECT * FROM shoppingCart WHERE shoppingCart.id='${id}'`;
  connection.query(sql, (err, result, fields)=>{
    if(err){
      console.log(err)
     } 
     else{
      res.send(result)
     }
  });
});

app.post("/mycartDelete",(req,res)=> {
  try {
    const isLogin = req.body.login.status; // ????????? body??? ???????????? ????????? ???????????? ???????????????.
    const nums = req.body.nums; 
    let sql = `DELETE FROM shoppingCart WHERE idx IN (${nums});`;
    connection.query(sql, (err,result,field)=>{
      if(err){
        console.log(err)
      }
      else{
        res.send(result)
      }
    })
  } catch(err){
    res.send({error: err.message}); //?????? ???????????? ???????????????
  }
});
app.post("/buyproduct", (req,res)=>{
  var num=req.body.result[0].num;
  var pdt_name=req.body.result[0].pdt_name;
  var pdt_price=req.body.result[0].pdt_price;
  var imgsource=req.body.result[0].imgsource;
  var buytime=req.body.buytime;
  var count=req.body.count;
  var id = req.body.authority.id;
  const sql = `INSERT INTO customer_buylist (num, id, pdt_name, pdt_price, count, imgsource, buytime) VALUES (${num}, '${id}', '${pdt_name}', ${pdt_price}, ${count}, '${imgsource}', '${buytime}')`;
  connection.query(sql, (err, result, field) => {
    if(err){
      console.log(err)
    }
    else{
      res.send(result)
    }
  });
});
app.post('/cscenter=board_list', (req, res) => {
  const sql = `SELECT * FROM cs_board_info ORDER BY idx DESC`;
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
app.post("/cscenter=board_list_read_user", (req, res)=>{
  const text = req.query.idx;
  const sql = `SELECT id FROM cs_board_info WHERE idx LIKE ${text}`;
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
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.pw).digest('base64'); //?????????,
  const Email = req.body.email;
  const NICKNAME = req.body.nickname;
  const PHONE = req.body.phone;
  const DATE = req.body.date_created;
  console.log(Id,Email,NICKNAME,PHONE,DATE);
  const sql = `INSERT INTO customer_info (id, pw, nickname, email, phone, date_created) VALUES ('${Id}', '${Pw}', '${NICKNAME}', '${Email}', '${PHONE}', '${DATE}')`;
  connection.query(sql, (err, rows, fields) => {
    if (err) {
      console.log('DB SAVE FAIL');
    } else {
      res.send(rows);
    }
  });
});
// token ?????? ?????? id??? ???????????? id??? ???????????? ????????? ??????????????? ???????????? ?????? ??????
app.post('/pwcheck', (req, res) => {
  const Id = req.body.logined_ID;
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64'); //?????????,
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
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.inputPs).digest('base64'); //?????????,
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
          // ????????? ??????(payload)
        },
        jwtJSON.secret,    // ?????? ???
        {
          // expiresIn: '5m'    // ?????? ????????? 5???
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
}); // => ?????????
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
  const Pw = crypto.createHmac('sha256', key.secret).update(req.body.pw).digest('base64'); //?????????,
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
}); // => ????????????
 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} // --> heroku 
 
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`The server is running on PORT ${PORT}`);

// connection.end();
