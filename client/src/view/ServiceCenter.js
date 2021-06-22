import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import * as time from '../script/time.js';


import Table from 'react-bootstrap/Table'
import HomeStyle from '../css/HomeStyle.module.css';
import ServiceCenterStyle from '../css/ServiceCenter.css';

import { TOP, BOTTOM } from './Home';

class ServiceCenter extends Component {
    state = {
      cs_boardinfo: [],
      authority: [],
      date: '',
      time: '',
    };


    componentDidMount() {
      this.onBoardboard_list();
      this.checkAuthority();
    }
    
    // 게시판 쓰기, 읽기, 목록
    onBoardboard_list = () => {
      axios.get('/cscenter=board_list')
      .then(res=> {this.setState({cs_boardinfo: res.data})})
      .catch((Error)=>{console.log(Error)})
    }
    
    checkAuthority = async() => {
      axios.get('/authority')
      .then(res=>this.setState({authority:res.data}))
      .catch((Error)=>{console.log(Error)})
    }

    render() {
      const { cs_boardinfo} = this.state;
      const { authority } = this.state;
      return (
      <div className={HomeStyle.body_wrap}>
        
        <TOP/>

        <div id="content">
          <div className="servicecenter_wrap">
            
            <div className="content_box">
              
              <div className="left_menu">
                <h2 className="depth_1">고객센터</h2>
                <ul id="lnb" className="depth_2">
                  <li className="open">
                    <a href="/cscenter=not_list">공지사항</a>
                  </li>
                  <li className="">
                    <a href="/cscenter=faq_list">자주묻는질문</a>
                  </li>
                </ul>
              </div>
                
            </div>

            <div className="boardlist">

              <div className="writeboardgo">
                {authority.status==="login"?<h1 className="write_icon"><Link to="/cscenter=write_board">글쓰기</Link></h1>:<h1 className="write_icon"><Link to="/user/login">로그인</Link></h1>}
              </div>
              <div className="b_list_table">

                <Table className="table table-hover">
                  <caption>문의사항 리스트</caption>
                  <colgroup>
                    <col width="7%"/>
                    <col width="51px"/>
                    <col/>
                    <col width="18%"/>
                    <col width="16%"/>
                    <col width="6%"/>
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">번호</th>
                      <th scope="col">말머리</th>
                      <th scope="col">제목</th>
                      <th scope="col">글쓴이</th>
                      <th scope="col">작성일</th>
                      <th scope="col">조회</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cs_boardinfo.map(item => {
                      return(
                    <tr>
                      <td className="num">{item.idx}</td>
                      <td className="subject">{item.subject}</td>
                      <td className="title" key={item.idx}><Link><em className="icon_img"/>{item.title}</Link></td>
                      <td className="creater">{item.nickname}</td>
                      <td className="date_created">{item.date_created}</td>
                      <td className="hit">{item.hit}</td>
                    </tr>
                    )})}
                  </tbody>
                </Table>
                
              </div>
              
            </div>

          </div> 

        </div>

        <BOTTOM/>
          
      </div>
      );
    }
}

//   export class ReadBoard extends Component {
//     render() {
//         return (
//           <div className="App">

//         </div>
//         );
//     "
// "


  export default ServiceCenter;