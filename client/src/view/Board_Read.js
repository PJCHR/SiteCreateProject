import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import * as time from '../script/time.js';

import HomeStyle from '../css/HomeStyle.module.css';
import '../css/Board_ReadStyle.css';

import { TOP, BOTTOM } from './Home';


class Board__Read extends Component {

  state = {
    cs_boardinfo: [],
    authority: [],
  };

  componentDidMount() {
    this.checkAuthority();
    this.onView();
  }

  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = result.idx;

    return rst;
  };
  onView = () => {
    var query = this.getQueryString();
    axios.post(`/cscenter=board_list_read?idx=${query}`)
    .then(res=> {
      this.setState({cs_boardinfo: res.data});

      var btn = document.getElementById("delBtn");
      var btn2 = document.getElementById("fixBtn");

      this.state.cs_boardinfo.map((item) => {
        if(this.state.authority.id === item.id){

          btn.style.visibility = "visible";
          btn2.style.visibility = "visible";
        }
      })

    })
    .catch((Error)=>{console.log(Error)})
  }

  onbtnSty = async () => {
    var query = this.getQueryString();
    axios.post(`/cscenter=board_list_read-delete?idx=${query}`)
    .then(() => alert('삭제완료'))
    .then(() => window.location.href = "/cscenter=board_list")
    .catch((Error)=>{console.log(Error)})
  }
  onbtnFix = async () => {
    var query = this.getQueryString();
    document.location.href = `/cscenter=board_list_fix?idx=${query}`;
  }

  checkAuthority = () => {
    axios.post('/authority')
    .then(res=>{
      this.setState({authority:res.data})
    })
    .catch((Error)=>{console.log(Error)})
  }
      

  render() {
    const { authority } = this.state;
    const { cs_boardinfo } = this.state;
    return (
      <div className={HomeStyle.body_wrap}>
        <TOP ReturnUrl={document.location.href}/>

        <div id="content">
          <div className="board_wrap">
          
            <div className="board_read">
              <h1>게시판</h1>
              
              {this.state.cs_boardinfo.map(list =>{
                return(
                  // 글쓰기에서 작성하면 <p>@@</p>로 저장되기 때문에 저장될 때 태그를 없애거나 글을 불러올 때 없애는 방법이 필요.
                  <div className='board-container'>
                    <div className="title_box" key={list.idx}>
                      <h5>[{list.subject}] {list.title}</h5>
                      <h1>{list.nickname}   |   {list.date_created}</h1>
                    </div>

                    <div className="cont">{list.content}</div>

                    
                  </div>
                )})
              }

              <div className="btn_box">
                <span><input className="btn btn-primary" id="delBtn" type="button" value="삭제" onClick={this.onbtnSty}></input></span>
                <span><input className="btn btn-primary" id="fixBtn" type="button" value="수정" onClick={this.onbtnFix}></input></span>
              </div>

            </div>
            
          </div>
        </div>

        <BOTTOM/>
      </div>
    );
  }
}

export default Board__Read;