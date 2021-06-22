import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PWcheckStyle from '../css/PWcheckStyle.module.css';


class PWcheck extends Component {
    state = {
        
        inputPs: '',
        pwcheck:[],
    };

    // checkApprove = async () => {
    //     const options = {
    //         method: "post",
    //         body: JSON.stringify(this.state),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }
    //     const { inputId, inputPs } = this.state;
    //     if (inputPs === '') {
    //         alert("패스워드를 입력해주세요");
    //     }
    //     else if ( inputPs !== '') {
    //         await fetch('/pwcheck', options)
    //             .then(response => response.json())
    //             .then(response => this.setState({ pwcheck: response }))
    //     }
    //     const { pwcheck } = this.state;
    //     if (pwcheck.success === 'true') {
    //         document.location.href = '/customerInfo';
    //     }
    //     else if (pwcheck.success === 'false') {
    //         alert("비밀번호가 맞지않습니다.");
    //     }
    // }
  
  
    // enterCheck = (event) => {
    //     if (event.keyCode === 13) {
    //         this.checkApprove();
    //     }
    // }
    
    render() {
      return (
        <div className={PWcheckStyle.member_wrap}>

            <header className={PWcheckStyle.member_header}>
                <h1 className={PWcheckStyle.tit}>
                    <a href="https://aaaqwe.herokuapp.com" className={PWcheckStyle.sp_login_logo_11st_s}>나의쇼핑사이트</a>
                    <span>비밀번호 확인</span>
                </h1>
            </header>

            <div className={PWcheckStyle.password_recheck}>
                <form name="pwchkform" id="pwchkform" onsubmit="return false;">
                    {/* <input id="isVisibleCaptcha" name="isVisibleCaptcha" type="hidden" value="false">
                    <input id="captchaResponse" name="captchaResponse" type="hidden" value=""> */}

                    <h2 class="sr_only">비밀번호 재확인</h2>
                    <p className={PWcheckStyle.password_info}>회원님의 개인정보를 안전하게 보호하기 위해<em className={PWcheckStyle.fc_red}>인증 후 변경이 가능</em>합니다.</p>

                    {/* <!-- 11번가 아이디 비밀번호 입력 --> */}
                    
                    <div className={PWcheckStyle.password_recheck_inner_open}>
                            
                        <p className={PWcheckStyle.connect_id_st11}><span className={PWcheckStyle.in_btn}>아이디 : <strong>admin@gmail.com</strong></span></p>

                        <div className={PWcheckStyle.password_box}>
                            {/* <!-- [D] input에 포커스 시 : .inp_box 에 .active 클래스 추가 --> */}
                            <div className="inp_box">
                                <label for="memScrtNo" className={PWcheckStyle.password_lab}>비밀번호를 입력하세요.</label>
                                <input type="password" id="memScrtNo" className={PWcheckStyle.password_inp} title="비밀번호 입력" name="memScrtNo" maxlength="20" onclick="rakeLog.sendRakeLog(this);" onkeypress=""/>
                            </div>
                            <button type="button" className={PWcheckStyle.btn_ok} onclick="chkConfirmPassword()"><span className={PWcheckStyle.in_btn}>확인</span></button>
                            <p id="messageArea" className={PWcheckStyle.err_msg}></p>
                        </div>
                    </div>
                    {/* 버튼 클릭 또는 번호 창에서 엔터 시, 비번 정보가 서버로 넘어가서 정보 일치 시 페이지 이동. */}


                    {/* <!-- T아이디 비밀번호 입력 -->
                    

                    <!-- 소셜 계정 -->
                    

                    <!-- recaptcha --> */}
                    
                    <div id="divCaptcha" className={PWcheckStyle.g_recaptcha} data-sitekey="6LfEzIUUAAAAAK4Im2iMemIwqJFMM6eDeFosHE1n" ></div>
                    
                </form>

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