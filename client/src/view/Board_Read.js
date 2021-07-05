import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import * as time from '../script/time.js';

import HomeStyle from '../css/HomeStyle.module.css';
import '../css/Board_WriteStyle.css';

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
    axios.get(`/cscenter=board_list_read?idx=${query}`)
    .then(res=> {
      this.setState({cs_boardinfo: res.data});


      // 로그인한 아이디. 쿠키에 저장된 id와 게시글을 작성한 id가 같다면 삭제 버튼이 표시되도록할 것임. // display를 none으로 할지, visibility를 hidden으로 할지 선택이 필요.
      var btn = document.getElementById("delBtn")

      this.state.cs_boardinfo.map((item) => {
        if(this.state.authority.id === item.id){
          console.log("일치") // ok
          this.setState({btn_sty: `background: 'black'`})

          // btn.style.display = "block";
          btn.style.visibility = "visible";
        }
      })

    })
    .catch((Error)=>{console.log(Error)})
  }

  
  idxCheck = async () => {
    const { idx } = this.state;
    await axios.get(`/cscenter=board_list_read-content_check?idx=${idx}`)
        .then(response => response.json())
        .then(response => this.setState({ idcheck: response }))
    const { idcheck } = this.state;
    if (idx === '') {
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
  onbtnSty = async () => {
    var query = this.getQueryString();
    axios.post(`/cscenter=board_list_read-delete?idx=${query}`)
    .then(() => alert('삭제완료'))
    .then(() => window.location.href = "/cscenter=board_list")
    .catch((Error)=>{console.log(Error)})
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
        <TOP/>

        <div id="content">
          <div className="board_wrap">
          
            <div className="board_write">
              <h1>게시판</h1>
              <span><input className="btn btn-primary" id="delBtn" type="button" value="삭제" onClick={this.onbtnSty}></input></span>
              {this.onbtnSty}
              <div className='movie-container'>
                {this.state.cs_boardinfo.map(list =>{
                  return(
                  // 글쓰기에서 작성하면 <p>@@</p>로 저장되기 때문에 저장될 때 태그를 없애거나 글을 불러올 때 없애는 방법이 필요.
                  <div className="title" key={list.idx}>
                    <h2>{list.subject}{list.title}</h2>
                    <h6>{list.idx}{list.nickname}{list.date_created}</h6>
                    <div className="cont">
                      {list.content}
                    </div>
                  </div>
                  )})
                }

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