import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import queryString from 'query-string';
import * as time from '../script/time.js';
import ToggleButtonExample from '../script/ToggleButtonExample';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import HomeStyle from '../css/HomeStyle.module.css';
import '../css/Board_WriteStyle.css';

import { TOP, BOTTOM } from './Home';


class Board__Fix extends Component {

  state = {
    cs_boardinfo: [],
    authority: [],
    radios: [
      { name: '일반', value: '일반' },
      { name: '질문', value: '질문' },
      { name: '공지', value: '공지' },
    ],
    radioValue:'일반',
    check: false, 
    title:'',
    content:'',
    hit: 0,
  };

  componentDidMount() {
    this.checkAuthority();
    this.onGetData();
  }

  checkAuthority = async() => {
    axios.get('/authority')
    .then(
      res=>{this.setState({authority:res.data})
    
      if(this.state.authority.id !== 'admin'){
        console.log(this.state.authority.id)
        this.setState({radios: [
          { name: '일반', value: '일반' },
          { name: '질문', value: '질문' },
        ]})
      }
    })
    .catch((Error)=>{console.log(Error)})
  }

  getQueryString = () => {
    const result = queryString.parse(this.props.location.search);
    const rst = [result.idx,result.ReturnUrl];
    return rst;
  };

  onGetData = () =>{
    var query = this.getQueryString()[0];
    axios.post(`/cscenter=board_list_fix?idx=${query}`)
    .then(res=> {
        this.setState({cs_boardinfo: res.data});
        this.setState({title: this.state.cs_boardinfo[0].title});
        this.setState({content: this.state.cs_boardinfo[0].content});
        
      })
    .catch((Error)=>{console.log(Error)})
  }

  onSendData = async () => {
    
    const now = new Date();
    this.setState(await{date_created: time.getFormatDate(now) +' '+ time.getFormatTime(now)});
    this.setState({id: this.state.authority.id});
    this.setState({nickname: this.state.authority.name});
    if(this.state.check === true){
      this.setState({check: 1})
    } 
    if(this.state.check === false){
      this.setState({check: 0})
    }
    const {id, nickname, radioValue, title, content, hit, check, date_created} = this.state;
    if (id !== '' & nickname !== '' & radioValue !== '' & title !== '' & content !== '' & hit !== '' & check !== '') {

      var query = this.getQueryString()[0];
      var page = this.getQueryString()[1];

      if(check === 1){radioValue = '비공개';
        if(check === 1){
          axios.post(`/cscenter=write_board-fix?idx=${query}`,this.state)
          .then(res=>res)
          .then(() => alert('등록완료.'))
          .then(() => window.location.href = "/")
          .then(() => window.location.href = document.location.href = page)
          .catch((Error)=>{console.log(Error)})
        }
        if(check === 0){
          axios.post(`/cscenter=write_board-fix?idx=${query}`,this.state)
          .then(res=>res)
          .then(() => alert('등록완료.'))
          .then(() => window.location.href = "/")
          .then(() => window.location.href = document.location.href = page)
          .catch((Error)=>{console.log(Error)})
        }
      }
      else{
        if(check === 1){
          axios.post(`/cscenter=write_board-fix?idx=${query}`,this.state)
          .then(res=>res)
          .then(() => alert('등록완료.'))
          .then(() => window.location.href = "/")
          .then(() => window.location.href = document.location.href = page)
          .catch((Error)=>{console.log(Error)})
        }
        if(check === 0){
          axios.post(`/cscenter=write_board-fix?idx=${query}`,this.state)
          .then(res=>res)
          .then(() => alert('등록완료.'))
          .then(() => window.location.href = "/")
          .then(() => window.location.href = document.location.href = page)
          .catch((Error)=>{console.log(Error)})
        }
      }
    }
    else {
      if(id ==='' | nickname ==='' && id ==='undefined' | nickname ==='undefined'){
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
    }
  }

  render() {
    const { authority } = this.state;
    const { cs_boardinfo } = this.state;
    const { radios } = this.state;
    return (    
      <div className={HomeStyle.body_wrap}>
      <TOP ReturnUrl={document.location.href}/>

      <div id="content">
        <div className="board_wrap">
          
          <div className="board_write">
            
            <div className='form-wrapper'>
              <input className="title-input" type='text' placeholder='제목' onChange={e => this.setState({ title: e.target.value })} value={this.state.title}></input>

              <ToggleButton
                className="mb-2"
                id="toggle-check"
                type="checkbox"
                variant="outline-primary"
                checked={this.state.check}
                value="0"
                onChange={e => this.setState({ check: e.target.checked })}
              >
                비공개
              </ToggleButton>

              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    value={radio.value}
                    checked={this.state.radioValue=== radio.value}
                    onChange={e => this.setState({ radioValue: e.target.value })}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              
              {/* CKEDITOR.editorConfig = function(config){ config.enterMode = CKEDITOR.ENTER_BR}; */}
              
              <CKEditor
                  editor={ ClassicEditor }
                  config={{
                    placeholder: "글을 입력하십시오."
                  }}
                  data={this.state.content}
                  onReady={ editor => {
                      // You can store the "editor" and use when it is needed.
                      // console.log( 'Editor is ready to use!', editor );
                  }}
                  onChange={ ( event, editor ) => {
                    // console.log( { event, editor, data } );
                    const data = editor.getData();
                    
                    this.setState({content: data})
                    // console.log(this.state.content);
                  }}
                  onBlur={ ( event, editor ) => {
                      // console.log( 'Blur.', editor );
                  }}
                  onFocus={ ( event, editor ) => {
                      // console.log( 'Focus.', editor );
                  }}
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

  export default Board__Fix;