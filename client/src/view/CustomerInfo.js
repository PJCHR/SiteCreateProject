import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import CustomerInfoStyle from '../css/CustomerInfoStyle.module.css';

import { TOP, BOTTOM } from './Home';
import axios from 'axios';

class CustomerInfo extends Component {
    state = {
      authority:[],
      userInfo:[],
    };
    componentDidMount() {
      this.checkAuthority();
  }

  onViewInfo = async () => {
    this.setState({userId: this.state.authority.id})
    await axios.post('/customerInfo', this.state)
    .then(res => this.setState({ userInfo: res.data }))
    .catch(err => console.log(err));
  }

  onUserInfoChange = async () => {
      const { logined_ID, inputPs } = this.state;
      if (logined_ID === '') {
          alert("로그인 되어있지않습니다.");
          document.location.href="/login?ReturnUrl=" + document.location.href;
      }
      else if (inputPs === '') {
          alert("패스워드를 입력해주세요");
      }
      if ( inputPs !== '') {
          axios.post('/pwcheck', this.state)
          .then(res => {this.setState({ pwcheck: res.data })})
          .then(res => {
              const { pwcheck } = this.state;

              if (pwcheck.success === 'true') {
                  document.location.href = '/customerInfo';
              }
              else if (pwcheck.success === 'false') {
                  alert("패스워드가 맞지않습니다.");
              }
          })
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
                  <button className="btn btn-primary" type="button" onClick={this.onUserInfoChange}>변경</button>
                  <button className="btn btn-primary" type="button" onClick={() => document.location.href = '/'}>취소</button>
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