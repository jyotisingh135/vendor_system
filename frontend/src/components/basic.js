import React from 'react';
import './components.css';
import {NavLink} from 'react-router-dom';
import {allState,allCity} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';

class AgentProfiles extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    render() {
        return (
            <div className="agentprofile">
                <div className="w3-container w3-padding-32" id="projects">
                    <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Search Agent</h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        // allStates:state.states.allState,
        // allCities:state.city.allCity
    }};

const mapDispatchToProps=(dispatch)=>bindActionCreators({},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AgentProfiles);
