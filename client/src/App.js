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
import ReadBoard from './view/ServiceCenter';
import Board_Write from './view/Board_Write';
import Product from './view/Product';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} exact={true} />
        <Route path="/item/search" component={Search} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
        <Route path="/customerInfo" component={CustomerInfo} />
        <Route path="/pwcheck" component={PWcheck} />
        <Route path="/cscenter=board_list" component={ServiceCenter} />
        <Route path="/cscenter=write_board" component={Board_Write} />
        <Route path="/cscenter=faq_list" component={ReadBoard} />
        <Route path="/product_view" component={Product} />
      </Router>
    );
  }
}
export default App;
