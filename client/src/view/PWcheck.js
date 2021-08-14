import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PWcheckStyle from '../css/PWcheckStyle.module.css';


class PWcheck extends Component {
    state = {
        authority: [],
        logined_ID:'',
    };

    componentDidMount() {
        this.checkAuthority();
    }

    checkPwcheck = async () => {
        const { inputPs } = this.state;
        if (this.state.authority.id === '') {
            alert("로그인 되어있지않습니다.");
            document.location.href="/login?ReturnUrl=" + document.location.href;
        }
        else if (inputPs === '') {
            alert("패스워드를 입력해주세요");
        }
        if ( inputPs !== '') {
            this.setState({logined_ID: this.state.authority.id})
            await axios.post('/pwcheck', this.state)
            .then(res => {
                
                this.setState({ pwcheck: res.data })
        
                const { pwcheck } = this.state;
                if (pwcheck.success === 'true') {
                    document.location.href = '/customerInfo';
                }
                else if (pwcheck.success === 'false') {
                    alert("비밀번호가 맞지않습니다.");
                }
            })
        }
    }

    checkAuthority = () => {
        axios.get('/authority')
        .then(res=>this.setState({authority:res.data}))
        .catch((Error)=>{console.log(Error)})
    }
  
    enterCheck = (event) => {
        if (event.keyCode === 13) {
            this.checkPwcheck();
        }
    }
    
    render() {
        const { authority } = this.state;
      return (
        <div className={PWcheckStyle.member_wrap}>

            <header className={PWcheckStyle.member_header} ReturnUrl={document.location.href}>
                <h1 className={PWcheckStyle.tit}>
                    <a href="/" className={PWcheckStyle.sp_login_logo_11st_s}>나의쇼핑사이트</a>
                    <span>비밀번호 확인</span>
                </h1>
            </header>

            <div className={PWcheckStyle.password_recheck}>
                {/* <h2 class="sr_only">비밀번호 재확인</h2> */}
                <p className={PWcheckStyle.password_info}>회원님의 개인정보를 안전하게 보호하기 위해<em className={PWcheckStyle.fc_red}> 인증 후 변경이 가능 </em>합니다.</p>
                
                <div className={PWcheckStyle.password_recheck_inner_open}>
                        
                    <p className={PWcheckStyle.connect_id_st11}><span className={PWcheckStyle.in_btn}>아이디 : <strong>{authority.id}</strong></span></p>

                    <div className={PWcheckStyle.password_box}>
                        <div className="inp_box">
                            <input type="password" className={PWcheckStyle.password_inp} title="비밀번호 입력" placeholder="비밀번호를 입력하세요." onKeyUp={this.enterCheck} onChange={e => this.setState({ inputPs: e.target.value })}/>
                        </div>
                        <button className={PWcheckStyle.btn_ok} onClick={this.checkPwcheck}>확인</button>
                        <p id="messageArea" className={PWcheckStyle.err_msg}></p>
                    </div>
                </div>
                
                <div id="divCaptcha" className={PWcheckStyle.g_recaptcha}></div>
                    

                <ul className={PWcheckStyle.password_recheck_guide}>
                    <li>회원님의 개인정보를 신중히 취급하며, 회원님의 동의 없이는 기재하신 회원정보가 공개되지 않습니다. </li>
                    <li>보다 다양한 서비스를 받으시려면 정확한 정보를 항상 유지해 주셔야 합니다. </li>
                </ul>

            </div>

        </div>
      );
    }
  }
  
  export default PWcheck;