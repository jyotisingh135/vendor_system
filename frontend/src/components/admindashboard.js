import React,{Component} from 'react';
import customer from '../images/customers-icon-25.png';
import agent from '../images/agnet.png';
import carrier from '../images/icon_2.png';
import {NavLink} from 'react-router-dom';
class AdminDashboard extends Component{
    render(){
        return(<div>

            <div className='row'>
                <div className='col-sm-2'></div>
                <div className='col-sm-3' align='center' ><NavLink to="/agentData"><img src={agent} width="200px" height="200px" /><figcaption style={{'background-color':'#8EA895'}}>Agents</figcaption></NavLink></div>
                <div className='col-sm-3' align='center' ><NavLink to="/carrierData"><img src={carrier} width="200px" height="200px"/><figcaption style={{'background-color':'#8EA895'}}>Carriers</figcaption></NavLink></div>
                <div className='col-sm-3' align='center' ><NavLink to="/customerData"><img src={customer} width="200px" height="200px"/><figcaption style={{'background-color':'#8EA895'}}>customer</figcaption></NavLink></div>

                </div>
            </div>)
    }
}
export default AdminDashboard;