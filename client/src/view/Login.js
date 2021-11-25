import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import HomeStyle from '../css/HomeStyle.module.css';
import LoginStyle from '../css/LoginStyle.module.css';
import { TOP, BOTTOM } from './Home';
import axios from 'axios';

class Login extends Component {
  state = {
    inputId: '',
    inputPs: '',
    loginCheck: [],
}
  componentDidMount(){
    this.getQueryString();
    }

  loginApprove = async () => {
    const { inputId, inputPs } = this.state;
    if (inputId === '') {
        alert("ID를 입력해주세요");
    }
    else if (inputPs === '') {
        alert("패스워드를 입력해주세요");
    }
    else if (inputId !== '' && inputPs !== '') {
      axios.post('/login', this.state)
      
      .then(res=> {
        this.setState({ loginCheck: res.data })
      
        const { loginCheck } = this.state;
        
        if (loginCheck.success === 'true') {
          // alert("로그인이 되었습니다.");
          var page = this.getQueryString();
          document.location.href = page;
        }
        else if (loginCheck.success === 'false') {
          alert("로그인 정보가 일치하지 않습니다");
          // document.location.reload();
        }
    })
      .catch((Error)=>{console.log(Error)})
    }
  }

  enterCheck = (event) => {
      if (event.keyCode === 13) {
          this.loginApprove();
      }
  }
  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = result.ReturnUrl;
    return rst;
  };
  
  render() {
    return (
      <div className={HomeStyle.body_wrap}>
         <TOP/>
        
        <div id="content">
          <div className={LoginStyle.login_wrap}>
            <div className={LoginStyle.login_content}>
              <div className={LoginStyle.login_box}>
                <form action="/user/login">
                  <tr> <input type="text" placeholder="ID" onChange={e => this.setState({ inputId: e.target.value })}/> </tr>
                  <tr> <input type="password" placeholder="PASSWORD" onKeyUp={this.enterCheck} onChange={e => this.setState({ inputPs: e.target.value })}/> </tr>

                  <button className="btn btn-primary" type="button" onClick={this.loginApprove} value="로그인">로그인</button>

                  <div className={LoginStyle.gotextbox}>
                    <Link to="/register">회원가입</Link>
                    <Link to="/infoSearch">아이디/비밀번호 찾기</Link>
                </div>
                </form>

              </div>
            </div>
          </div>
        </div>
        <BOTTOM/>
      </div>
    );
  }
}

export default Login;
