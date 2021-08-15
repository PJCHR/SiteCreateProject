import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import CustomerInfoStyle from '../css/CustomerInfoStyle.module.css';

import { TOP, BOTTOM } from './Home';

class CustomerInfo extends Component {
    state = {
      id:"",
      pw: "",
      result:[],
    };
    
    
    render() {
      return (
        <div className={HomeStyle.Home_wrap}>
           <TOP ReturnUrl={document.location.href}/>
  
           <div id="content">
          <div className={CustomerInfoStyle.user_wrap}>
            <div className={CustomerInfoStyle.userBox}>
              <ul>
                <li>
                  <p>아이디</p>
                  <input type="text" id="id_field" onKeyUp={this.lowerCase} onChange={e => this.setState({ id: e.target.value })} />
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
                  <input type="text" onChange={e => this.setState({ email: e.target.value })}/>
                </li>
              
                <li>
                  <p>닉네임</p>
                  <input type="text" onChange={e => this.setState({ nickname: e.target.value })}/>
                </li>
              
                <li>
                  <p>전화번호</p>
                  <input type="tel" onChange={e => this.setState({ phone: e.target.value })}/>
                </li>

                <li>
                  <button className="btn btn-primary" type="button" onClick={this.sendData}>변경</button>
                  <button className="btn btn-primary" type="button" onClick={() => document.location.href = '/'}>취소</button>
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
  
  export default CustomerInfo;