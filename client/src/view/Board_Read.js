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
      this.onView();
      this.checkAuthority();
      this.onbtnSty();
    }

    onView = async () => {
      var query = this.getQueryString();
      axios.get(`/cscenter=board_list_read?idx=${query}`)
      .then(res=> {
        this.setState({cs_boardinfo: res.data});
      })
      .catch((Error)=>{console.log(Error)})
    }
    // 로그인한 아이디. 쿠키에 저장된 id와 게시글을 작성한 id가 같다면 삭제 버튼이 표시되도록할 것임.
    onbtnSty = async () => {
      console.log("생성")
      await this.state.cs_boardinfo.map((item, number) => {
        if(this.state.authority.id === item.id){
          const delStyle ={
            display: 'none',
            background: 'black',
          }
          return delStyle
        }
        // if(this.state.authority.id === item.id){
          <span><input className="btn btn-primary" type="button" value="aa"></input></span>
        // }
      })
    }
    
    getQueryString = () => {
      const result = queryString.parse(this.props.location.search);
      const rst = result.idx;
  
      return rst;
    };

    checkAuthority = () => {
      axios('/authority')
      .then(res=>this.setState({authority:res.data}))
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
                {/* <span><input className="btn btn-primary" type="button" value="aa"></input></span> */}
                {this.onbtnSty}
                <div className='movie-container'>
                  {this.state.cs_boardinfo.map(list =>{
                    return(
                    <div className="title" key={list.idx}>
                      <h2>{list.title}</h2>
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