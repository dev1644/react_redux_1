
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserListTable from "../components/ReduxDemo/UserListTable"
import YoutubeDemo from "../containers/YoutubeDemo"
export default class RootRouter extends Component {
  render() {
    return (
     
        <div className="parent_container">
        <Router>
         <div>
           
          <Route exact path='/home/youtube' component={YoutubeDemo}/>             
          <Route exact path='/' component={UserListTable}/>

           </div> 
           </Router>
      </div>
      
    )
  }
}
