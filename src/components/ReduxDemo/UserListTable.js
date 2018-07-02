import React, { Component } from 'react'
import User from '../images/aa.png'
import {Dropdown} from 'primereact/components/dropdown/Dropdown';
import {InputText} from 'primereact/components/inputtext/InputText';
import {connect} from "react-redux"
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import { GET_USER_LIST_DETAILS_REQUEST } from '../actions/types';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import './userlisttable.css'
import { Link } from 'react-router-dom'
class UserListTable extends Component {  
       
    componentDidMount() { 
      this.props.onRequestData();
     
    }
   
    TimeFormat=(date)=>{
      let res = date.split("T");
      let time= res[1].split(".");
    // return time[0];
    let datee=new Date(date);
     return datee.toLocaleTimeString();
    }
    TimeFormat2=(date)=>{
      let res = date.split("T");
      let time= res[1].split("+");
      let datee=new Date(date);
       return datee.toLocaleTimeString();
    // return time[0];
    }
//   
    status=(rowData,column)=>{
     
       if (rowData.status=="Open"){
        return <span style={{color: "#00a65a"}}>{rowData.status}</span>;
       }
       else {
        return <span style={{color: "#dd4b39"}}>{rowData.status}</span>;
       }
    }
    suspend=(rowData,column)=>{
    
       if (rowData.suspend=="Yes"){
        return <span style={{color: "#00a65a"}}>{rowData.suspend}</span>;
       }
       else {
        return <span style={{color: "#dd4b39"}}>{rowData.suspend}</span>;
       }
    }
    createdAt=(rowData,column)=>{
     return
     <div>
      {this.TimeFormat(rowData.createdAt)}</div>
    }
    updatedAt=(rowData,column)=>{
      if (rowData.updatedAt=="" || rowData.updatedAt==undefined){
        return <div>--</div>
      }
      else{
      return <div>
       {this.TimeFormat2(rowData.updatedAt)}</div>
      }
     }


  render() {
    let userList=[]
    console.log("hello",this.props);
    
    if(this.props.state.data.userList){
      this.props.state.data.userList.map((data,key)=>{
        let obj;
        if(data.suspend){obj={
            ...data,suspend:'Yes'
          }
        }else{
          obj={
            ...data,suspend:'No'
          }
        }
        if(data.status){
          obj={
            ...obj,status:'Lock'
          }
        }else{
          obj={
            ...obj,status:'Open'
          }
        }
        obj={
          ...obj,index:(key+1)
          }
        userList=userList.concat(obj)
      })
    }

    if(this.props.state.loading){
      return(<div>
        loadingg....
      </div>)
    }
    else{
    const { fetching, data, onRequestFilter,onRequestData, error } = this.props;
    return (
      <div className="user-profile-table-list">
      <div className="table-operations">
     </div>
      <Link to="/home/youtube"><button style={{margin:"20px",backgroundColor:"#53ff1a",height:'30px'}}>Click for Youtube Demo</button></Link>
      <h2>This is a demo for React & redux-saga</h2>
     <DataTable columnResizeMode="expand" resizableColumns={true} loading={fetching} loadingIcon="fas fa-spinner" scrollHeight={"70vh"}  value={userList} scrollable={true}>
        <Column field="index" header="S.No" filter={true}  style={{width:"50px"}}/>
        <Column field="_id" header="User ID" filter={true}  style={{width:"59px"}} className='userId'/>       
        <Column field="userName" header="User Name"  filter={true}  style={{width:"200px"}}/>
        <Column field="loginType"  header="Type" filter={true}  style={{width:"90px",textAlign:'center'}}/>       
        <Column field="createdBy" header="Created By" filter={true}  style={{width:"100px",textAlign:"center"}}/>
        <Column field="lastLogin" header="Last Login" body={this.updatedAt}  filter={true} style={{width:"150px"}}/>
        <Column field="level" header="Level" body={this.brandTemplate} filter={true}  style={{width:"90px",textAlign:'center'}}/>
        <Column field="balance" header="Balance" filter={true}  style={{width:"100px", textAlign:"right"}}/>
        <Column field="suspend" body={this.suspend} header="Suspend" style={{width:"80px"}} filter={true}  />
        <Column field="status"  header="Status" body={this.status}style={{width:"80px",textAlign:"center"}} filter={true} /> 
      </DataTable>

<br/>
        </div>
    )
  }
}
}
const mapStateToProps=(state)=>{
  console.log("inuserListTable",state)
  return{
    state:state,
    fetching:state.fetching,
    
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onRequestData: (data) => dispatch({type: GET_USER_LIST_DETAILS_REQUEST,data })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserListTable)