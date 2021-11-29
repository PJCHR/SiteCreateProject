import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as time from '../script/time.js';
import HomeStyle from '../css/HomeStyle.module.css';
import RegisterStyle from '../css/RegisterStyle.module.css';
import { TOP, BOTTOM } from './Home';
import axios from 'axios';

class Register extends Component {
  state = {
    id: "",
    idcheck: "",
    email: "",
    nickname: "",
    pw: "",
    re_pw: "",
    phone: "",
    registerActive:"",
    date_created: "",
  };

  idCheck = async () => {
    const { id } = this.state;
    await axios.get(`/idcheck?id=${id}`)
        .then(res => this.setState({ idcheck: res.data }))
    const { idcheck } = this.state;
    if (id === '') {
        alert('ID를 입력하세요.');
       
    }
    else if (idcheck.length === 0) {
        alert('해당 ID는 사용가능합니다.');
    this.setState({registerActive:"active"});
    }
    else if (idcheck.length === 1) {
        alert('해당 ID는 이미 존재합니다.');

    }

    
  }
  

  sendData = async () => {
    const now = new Date();
    this.setState(await{date_created: time.getFormatDate(now) +' '+ time.getFormatTime(now)});
    await this.idCheck;
    const {id, pw, re_pw, email, nickname, phone, registerActive} = this.state;
    console.log(this.state.id,this.state.pw,this.state.re_pw,this.state.email,this.state.nickname,this.state.phone,this.state.date_created);
    if (id !== '' & pw === re_pw & pw !== '' & re_pw !== '' & email !== '' & nickname !== '' & phone !== '' &registerActive==='active' ) {
      if(pw === re_pw){
        return axios.post("/register", this.state)
          .then(() => alert('가입되었습니다.'))
          .then(() => document.location.href = '/')
      }
    }
    else {
        if(id ===''){
            alert('ID 입력 바랍니다.');
        }
        else if(registerActive===''){
          alert("중복확인 버튼 눌러주세요.")
        }
        else if (pw === '') {
            alert('패스워드 입력 바랍니다.');
        }
        else if (re_pw === '') {
          alert('패스워드 확인란 입력 바랍니다.');
        }
        else if (pw !== re_pw) {
          alert('패스워드가 같지않습니다.'); // 화면 상에서 표시되어야함
        }
        else if (email === '') {
          alert('이메일 입력 바랍니다.');
        }
        else if (nickname === '') {
            alert('이름 입력 바랍니다.');
        }
        else if (phone === '') {
          alert('전화 번호를 입력 바랍니다.');
        }
    }

  }
  lowerCase = () =>{
      var id=document.getElementById("id_field");
      id.value=id.value.toLowerCase();
  }

  autoHypenPhone = (str) => {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
  }

  checkPhone = () => {
    var cellPhone = document.getElementById('cellPhone');
    cellPhone.onkeyup = function(event){
    event = event || window.event;
    var _val = this.value.trim();
    this.value = this.autoHypenPhone(_val) ;
    }
  }
  

  render() {
    
    return (
      <div className={HomeStyle.body_wrap}>
        <TOP ReturnUrl={document.location.href}/>
        
        <div id="content">
          <div className={RegisterStyle.signup_wrap}>
            <div className={RegisterStyle.signupBox}>
              <ul>
                <li>
                  <p>아이디</p>
                  <input type="text" id="id_field" onKeyUp={this.lowerCase} onChange={e => this.setState({ id: e.target.value })} />
                  <button className="btn btn-primary .idcheck" onClick={this.idCheck}  value="idCheck">중복확인</button>
                </li>

                <li>
                  <p>비밀번호</p>
                  <input type="password" onChange={e => this.setState({ pw: e.target.value })}/>
                </li>

                <li>
                  <p>비밀번호 확인</p>
                  <input type="password" onChange={e => this.setState({ re_pw: e.target.value })}/>
                </li>
              
                <li>
                  <p>이메일</p>
                  <input type="text" placeholder='abcde@gmail.com' onChange={e => this.setState({ email: e.target.value })}/>
                </li>
              
                <li>
                  <p>닉네임</p>
                  <input type="text" onChange={e => this.setState({ nickname: e.target.value })}/>
                </li>
              
                <li>
                  <p>전화번호</p>
                  <input type="text" name="cellPhone" id="cellPhone" placeholder="010-1234-5678" maxlength="13" onChange={e => this.setState({ phone: e.target.value })}/>
                </li>

                <li>
                  <button className="btn btn-primary" type="button" onClick={this.sendData} value="가입" >가입</button>
                  <button className="btn btn-primary" type="button" onClick={() => document.location.href = '/'} value="취소">취소</button>
                </li>

              </ul>
            </div>
          </div>
        </div>
        <BOTTOM/>
      </div>
    );
  }
}

export default Register;
