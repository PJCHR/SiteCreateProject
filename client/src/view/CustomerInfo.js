import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import CustomerInfoStyle from '../css/CustomerInfoStyle.module.css';

import { TOP, BOTTOM } from './Home';
import axios from 'axios';
import * as time from '../script/time.js';

class CustomerInfo extends Component {
    state = {
      authority:[],
      userInfo:[],
      pw: '',
      re_pw: '',
      email: '',
      nickname:'',
      phone: '',
      date_change: '',
    };
    componentDidMount() {
      this.checkAuthority();
  }

  onViewInfo = async () => {
    this.setState({userId: this.state.authority.id})
    await axios.post('/customerinfo', this.state)
    .then(res => {
      this.setState({ userInfo: res.data });
    })
    .then(res => {
      this.setState({ email: this.state.userInfo[0].email, nickname: this.state.userInfo[0].nickname, phone: this.state.userInfo[0].phone});
      // console.log(this.state.email, this.state.nickname, this.state.phone);
    })
    .catch(err => console.log(err));
  }

  sendData = async () => {
    const now = new Date();
    this.setState(await{date_change: time.getFormatDate(now) +' '+ time.getFormatTime(now)});
    const {userId, pw, re_pw, email, nickname, phone, date_change} = this.state;
    console.log(userId, pw, re_pw, email, nickname, phone, date_change);
    
    if (this.state.authority.status === 'login') {
      if (pw === re_pw & pw !== '' & re_pw !== '' & email !== '' & nickname !== '' & phone !== '') {
        if(pw === re_pw){
          return axios.post('/customerinfo-change',this.state)
          .then(() => alert('변경 완료되었습니다.'))
          .then(() => document.location.href = '/')
        }
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
    else {
      alert('유효시간이 지났습니다. 로그인 후 이용바랍니다. ');
      document.location.href = "/";
    }
  }

  checkAuthority = () => {
    axios.get('/authority')
    .then(res=> {
      this.setState({authority: res.data});
      this.onViewInfo();
    })
  }
    
    render() {
      const { userInfo } = this.state;
      return (
        <div className={HomeStyle.Home_wrap}>
           <TOP ReturnUrl={document.location.href}/>
  
           <div id="content">
          <div className={CustomerInfoStyle.user_wrap}>
          {userInfo.map(item => {
            return(
            <div className={CustomerInfoStyle.userBox}>
              <ul>
                <li>
                  <p>아이디 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <span><p>{item.id}</p></span>
                </li>
                <li>
                  <p>비밀번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <input type="password" onChange={e => this.setState({ pw: e.target.value })}/>
                </li>

                <li>
                  <p>비밀번호 확인 </p>
                  <input type="password" onChange={e => this.setState({ re_pw: e.target.value })}/>
                </li>
              
                <li>
                  <p>이메일 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <input type="text" onChange={e => this.setState({ email: e.target.value })} placeholder={item.email}/>
                </li>
              
                <li>
                  <p>닉네임 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                  <input type="text" onChange={e => this.setState({ nickname: e.target.value })} placeholder={item.nickname}/>
                </li>
              
                <li>
                  <p>전화번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                  <input type="tel" onChange={e => this.setState({ phone: e.target.value })} placeholder={item.phone}/>
                </li>

                <div className={CustomerInfoStyle.btn_box}>
                  <button className="btn btn-primary" onClick={this.sendData}>변경</button>
                  <button className="btn btn-primary" onClick={() => document.location.href = '/'}>취소</button>
                </div>
              </ul>
            </div>
            )})}
          </div>
        </div>
            
          <BOTTOM/>
        </div>
      );
    }
  }
  
  export default CustomerInfo;