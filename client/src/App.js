import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './view/Home';
import Search from './view/Search';
import Login from './view/Login';
import Register from './view/Register';
import CustomerInfo from './view/CustomerInfo';
import PWcheck from './view/PWcheck';
import ServiceCenter from './view/ServiceCenter';
import Board_Read from './view/Board_Read';
import Board_Write from './view/Board_Write';
import Board_Fix from './view/Board_Fix';
import Item from './view/Item';
import Cartbox from './view/Cartbox';
import OrderAction from './view/OrderAction';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} exact={true} />
        <Route path="/item/search" component={Search} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/cartbox" component={Cartbox} />
        <Route path="/customerInfo" component={CustomerInfo} />
        <Route path="/pwcheck" component={PWcheck} />
        <Route path="/cscenter=board_list" component={ServiceCenter} />
        <Route path="/cscenter=board_list_read" component={Board_Read} />
        <Route path="/cscenter=board_list_write" component={Board_Write} />
        {/* <Route path="/cscenter=board_list_fix" component={Board_Fix} /> */}
        {/* <Route path="/cscenter=faq_list" component={ReadBoard} /> */}
        <Route path="/itempage" component={Item}/>
        <Route path="/orderaction" component={OrderAction}/>
      </Router>
    );
  }
}
export default App;
