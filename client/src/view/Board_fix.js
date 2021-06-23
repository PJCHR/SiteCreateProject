import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import * as time from '../script/time.js';
import ToggleButtonExample from '../script/ToggleButtonExample';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import HomeStyle from '../css/HomeStyle.module.css';
import '../css/Board_WriteStyle.css';

import { TOP, BOTTOM } from './Home';


class Board__fix extends Component {

    state = {
      cs_boardinfo: [],
      authority: [],
      radios: [
        { name: '일반', value: '일반' },
        { name: '질문', value: '질문' },
        { name: '공지', value: '공지' },
      ],
      radioValue:'일반',
      title:'',
      content:'',
      hit:0,
      look_post:0,
    };

    componentDidMount() {
      this.onView();
      this.checkAuthority();
    }

    onRadio = (data) => {
    
      console.log(data);
    }
    onRadioHandleChange = () => {
      
    }

    onView = async () => {
      axios.get('/cscenter=write_board')
      .then(res=> {
        this.setState({cs_boardinfo: res.data});
      })
      .catch((Error)=>{console.log(Error)})
    }
    
    onSendData = async () => {
      const now = new Date();
      this.setState(await{date_created: now});
      this.setState({id: this.state.authority.id});
      this.setState({nickname: this.state.authority.name});

      const {id, nickname, radioValue, title, content, hit, look_post} = await this.state;
      if (id !== '' & nickname !== '' & radioValue !== '' & title !== '' & content !== '' & hit !== '' & look_post !== '' ) {
        return axios.post("/cscenter=write_board-fix",this.state)
        .then(res=>res)
        .then(() => alert('등록완료.'))
        .then(() => window.location.href = "/cscenter=board_list")
        .catch((Error)=>{console.log(Error)})
      }
      else {
        if(id ==='' | nickname ===''){
            alert('로그인이 되어있지않습니다.');
            window.location.href = '/user/login'
        }
        else if(radioValue===''){ // 말머리 선택 , 디폴트 일반
          alert("말머리가 선택되어있지않습니다.")
        }
        else if (title === '') {
            alert('제목을 작성하지않았습니다..');
        }
        else if (content === '') {
          alert('내용을 작성하지않았습니다.');
        }
        // 체크박스로 디폴트 공개(0) 기본설정되있도록 , look_post = 0 , 만약 체크박스가 논체크라면 look_post는 0 , look_post가 0이면 공개, 아니라면 비공개(운영자만 열람가능 권한 운영자)
        else if (look_post === '') {
          alert('비공개여부를 설정하지않았습니다.');
        }
      }
    }
    
    checkAuthority = () => {
      axios('/authority')
      .then(res=>this.setState({authority:res.data}))
      .catch((Error)=>{console.log(Error)})
    }
      

    render() {
      const { authority } = this.state;
      const { cs_boardinfo } = this.state;
      const { radios } = this.state;
      const { radioValue } = this.state;
      
      return (    
        <div className={HomeStyle.body_wrap}>
          <TOP/>

          <div id="content">
            <div className="board_wrap">
              
              <div className="board_write">
                <h1>Movie Review</h1>
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
                <div className='form-wrapper'>
                  {/* 각 입력 부분에 target으로 값 받아서 서버로 넘겨서 저장 */}
                  <input className="title-input" type='text' placeholder='제목' onChange={e => this.setState({ title: e.target.value })}/>
                  
                  <ButtonGroup>
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue=== radio.value}
                        onChange={e => this.setState({ radioValue: e.target.value })}
                      >
                        {radio.name}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                  

                  <CKEditor
                      editor={ ClassicEditor }
                      config={{
                        placeholder: "글을 입력하십시오."
                      }}
                      // data="<p>내용</p>"
                      onReady={ editor => {
                          // You can store the "editor" and use when it is needed.
                          // console.log( 'Editor is ready to use!', editor );
                      } }
                      onChange={ ( event, editor ) => {
                          const data = editor.getData();
                          // console.log( { event, editor, data } );
                          this.setState({content: data})
                        }}
                      onBlur={ ( event, editor ) => {
                          // console.log( 'Blur.', editor );
                      } }
                      onFocus={ ( event, editor ) => {
                          // console.log( 'Focus.', editor );
                      } }
                  />
                </div>
                <button className="submit-button" onClick={this.onSendData}>입력</button>
              </div>
            </div>
          </div>

          <BOTTOM/>
        </div>
      );
    }
  }

  export default Board__fix;