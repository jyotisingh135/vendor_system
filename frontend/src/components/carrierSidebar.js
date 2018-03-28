import React from 'react';
import {logout} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import './componentLogin.css';
import { connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {ListGroupItem,ListGroup,Button} from 'react-bootstrap';

class carrierSidebar extends React.Component{
    constructor(){
        super();
        this.state={}
    }

    logoutHandler=(e)=>{
        e.preventDefault();
        this.props.logout();
    };

    render(){
        return(
            <div className="col-sm-3 sidenav">
                <ListGroup>
                    <ListGroupItem><NavLink to="/">Dashboard</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/services">Services</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/agentinfo">Agents Info</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/carrier">Carriers Info</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/">Customer</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/agentprofile">Agent Profile</NavLink></ListGroupItem>
                    <ListGroupItem><NavLink to="/carrierprofile">Carrier Profile</NavLink></ListGroupItem>
                    {/*<ListGroupItem><Button onClick={this.logoutHandler}>Logout</Button></ListGroupItem>*/}
                </ListGroup>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    //user:state.login
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({logout},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(carrierSidebar);