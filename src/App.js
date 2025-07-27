import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
export default class App extends Component {
    apikey = process.env.REACT_APP_NEWS_API_KEY;
   pageSize=8;
  render(){
  return(
  <>
  <Router>
   
<Navbar  />
<Routes>



<Route path="/science" element={ <News apikey={this.apikey} key="science" pageSize={this.pageSize} category="science" />}/>
<Route path="/health" element={ <News apikey={this.apikey} key="health" pageSize={this.pageSize} category="health" />}/>
<Route path="/sports" element={ <News apikey={this.apikey} key="sports" pageSize={this.pageSize} category="sports" />}/>
<Route path="/entertainment" element={ <News apikey={this.apikey} key="entertainment" pageSize={this.pageSize} category="entertainment" />}/>
<Route path="/" element={ <News apikey={this.apikey} key="general" pageSize={this.pageSize} category="general" />}/>
<Route path="/business" element={ <News apikey={this.apikey} key="business" pageSize={this.pageSize} category="business" />}/>
<Route path="/technology" element={ <News apikey={this.apikey} key="technology" pageSize={this.pageSize} category="technology" />}/>
</Routes>
  </Router>
  </>
  );  
}}
//business entertainment general health science sports technology
