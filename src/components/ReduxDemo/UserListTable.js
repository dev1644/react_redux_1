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
    userNameTemplate(rowData,column){
      let srce,ipAddr;
      let path2=`${imagebasepath}/${rowData.picture}`
      if(rowData.picture==""||rowData.picture==undefined)
      {
        srce=User
      }
      else if(rowData.loginType=="Facebook" || rowData.loginType=="Google"){
        srce=rowData.picture
      }
      else
      srce=path2
if(rowData.ipAddress==""||rowData.ipAddress==undefined)
ipAddr="192.168.17.9"
else
ipAddr=rowData.ipAddress;
      return <div style={{display:"flex"}}>
       <div id="UserImageDiv"><div id="OnlineCursordiv"></div> <img id="UserAvatarimg"src={srce} alt="av" style={{height:"30px",width:"30px",borderRadius:"50px"}}/></div>
        <div><div>{rowData.userName}</div><div>{ipAddr}</div></div>
        </div>;
    }
   
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
     return <div>{DateFormat(rowData.createdAt)}&nbsp;&nbsp;
      {this.TimeFormat(rowData.createdAt)}</div>
    }
    updatedAt=(rowData,column)=>{
      if (rowData.updatedAt=="" || rowData.updatedAt==undefined){
        return <div>--</div>
      }
      else{
      return <div>{DateFormat(rowData.updatedAt)}&nbsp;&nbsp;
       {this.TimeFormat2(rowData.updatedAt)}</div>
      }
     }


  render() {
    let userList=[]
    console.log("hello",this.props);
    
    if(this.props.state.userList){
      this.props.userList.map((data,key)=>{
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
          ...obj,index:((key+1)+((this.state.page-1)*this.state.limit))
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
      <span id="UserText">All Users</span>
     
      <span  id="showText">Show</span>
     </div>
      
     <DataTable columnResizeMode="expand" resizableColumns={true} loading={fetching} loadingIcon="fas fa-spinner" scrollHeight={"51vh"} ref={(el)=>{this.dt=el;}} onRowClick={(e)=>{this.props.history.push(`/home/user/userprofile/usersummary?${e.data.email}`)}} value={userList} scrollable={true}>
        <Column field="index" header="S.No" filter={true}  style={{width:"50px"}}/>
        <Column field="_id" header="User ID" filter={true}  style={{width:"59px"}} className='userId'/>       
        <Column field="userName" header="User Name" body={this.userNameTemplate} filter={true}  style={{width:"200px"}}/>
        <Column field="email" header="Email" filter={true}  style={{width:"250px",textAlign:"left"}}/>
        <Column field="loginType"  header="Type" filter={true}  style={{width:"90px",textAlign:'center'}}/>       
        <Column field="createdBy" header="Created By" filter={true}  style={{width:"100px",textAlign:"center"}}/>
        <Column field="createdAt" header="Registration Date" body={this.createdAt}  filter={true} style={{width:"150px"}} />
        <Column field="lastLogin" header="Last Login" body={this.updatedAt}  filter={true} style={{width:"150px"}}/>
        <Column field="level" header="Level" body={this.brandTemplate} filter={true}  style={{width:"70px",textAlign:'center'}}/>
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
  return{
    state:state,
    fetching:state.fetching,
    userArrayList:state.userArrayList
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    onRequestData: (data) => dispatch({type: GET_USER_LIST_DETAILS_REQUEST,data })
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UserListTable)