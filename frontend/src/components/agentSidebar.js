import React from 'react';
import {logout} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import './componentLogin.css';
import { connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {ListGroupItem,ListGroup,Button} from 'react-bootstrap';

class agentSidebar extends React.Component{
    constructor(){
        super();
        this.state={
            sidebar:''
        }
    }

    logoutHandler=(e)=>{
        e.preventDefault();
        this.props.logout();
    };

    getValue = (data) =>{
        this.setState({
            sidebar:data
        });
    }
    render(){
        return(
            <div className="col-sm-3 sidenav">
                <ListGroup>
                    {
                        this.state.sidebar === "Dashboard" ? <NavLink to="/"><ListGroupItem onClick={() => {
                                this.getValue("Dashboard")
                            }} active>Dashboard</ListGroupItem></NavLink> :
                            <NavLink to="/"><ListGroupItem onClick={() => {
                                this.getValue("Dashboard")
                            }}>Dashboard</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Services" ? <NavLink to="/services"><ListGroupItem onClick={() => {
                                this.getValue("Services")
                            }} active>Services</ListGroupItem></NavLink> :
                            <NavLink to="/services"><ListGroupItem onClick={() => {
                                this.getValue("Services")
                            }}>Services</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Agents Info" ? <NavLink to="/agentinfo"><ListGroupItem onClick={() => {
                                this.getValue("Agents Info")
                            }} active>Agents Info</ListGroupItem></NavLink> :
                            <NavLink to="/agentinfo"><ListGroupItem onClick={() => {
                                this.getValue("Agents Info")
                            }}>Agents Info</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Carriers Info" ? <NavLink to="/carrier"><ListGroupItem onClick={() => {
                                this.getValue("Carriers Info")
                            }} active>Carriers Info</ListGroupItem></NavLink> :
                            <NavLink to="/carrier"><ListGroupItem onClick={() => {
                                this.getValue("Carriers Info")
                            }}>Carriers Info</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Customer" ? <NavLink to="/customer"> <ListGroupItem onClick={() => {
                                this.getValue("Customer")
                            }} active>Customer</ListGroupItem></NavLink> :
                            <NavLink to="/customer"> <ListGroupItem onClick={() => {
                                this.getValue("Customer")
                            }}>Customer</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Agent Profile" ?
                            <NavLink to="/agentprofile"><ListGroupItem onClick={() => {
                                this.getValue("Agent Profile")
                            }} active>Agent Profile</ListGroupItem></NavLink> :
                            <NavLink to="/agentprofile"><ListGroupItem onClick={() => {
                                this.getValue("Agent Profile")
                            }}>Agent Profile</ListGroupItem></NavLink>
                    }
                    {
                        this.state.sidebar === "Carrier Profile" ?
                            <NavLink to="/carrierprofile"><ListGroupItem onClick={() => {
                                this.getValue("Carrier Profile")
                            }} active>Carrier Profile</ListGroupItem></NavLink> :
                            <NavLink to="/carrierprofile"><ListGroupItem onClick={() => {
                                this.getValue("Carrier Profile")
                            }}>Carrier Profile</ListGroupItem></NavLink>
                    }
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    //user:state.login
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({logout},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(agentSidebar);