import React from 'react';
import './components.css';
import {NavLink} from 'react-router-dom';
import {allState,allCity,getAgent,delAgent,updateAgent,getAgentServices,searchAgent} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Radio,Row,Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
let message="";
class AgentProfile extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            type:'A',
            show: false,
            isActive: false,
            isEditing:false,
            agentValues:{
                agentId:'',
                agentName:'',
                companyName:'',
                street:'',
                state:'',
                cityId:'',
                zipCode:'',
                classification:'',
                active:''
            },
            searchAgentValues:{
                agentId:'',
                agentName:'',
                companyName:'',
                zipCode:'',
                serviceId:''
            },
            agentServicesValues:{
                customSid:'',
                serviceId:new Set(),
                accessId:''
            },
            searchText:'',
            searchArr:[]
        };
    }

    componentWillMount(){
        //this.serviceSet=new Set();
        this.props.allState();
        this.props.getAgent();
        this.props.getAgentServices(this.state.type);
    };

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };

    handleHide() {
        this.setState({ show: false });
    }

    initial = () => {

        this.props.allCity(this.state.agentValues.state);
    };

    getCity = (e) =>{

        const {agentValues}=this.state;
        agentValues[e.target.name]=e.target.value;
        this.setState({agentValues},()=>{
            this.initial();
        });
    };

    setAgentId = () => {

        if(window.confirm("Are you sure you want to delete?")){
            this.props.delAgent(this.state.agentId);
        }
    };

    dataDelete = (data) =>{

        this.setState({
            agentId:data
        },()=>{
            this.setAgentId();
        });
    };

    agentEdit = (agentId) =>{
        this.props.agentData.map((value, index) => {
            if(value.agentId===agentId){
                this.setState({
                    agentValues:{
                        agentId:value.agentId,
                        agentName:value.agentName,
                        companyName:value.companyName,
                        street:value.street,
                        state:value.state,
                        cityId:value.cityId,
                        zipCode:value.zipCode,
                        classification:value.classification,
                        active:value.active
                    }},()=>{
                    //console.log(this.state.userValues.hobby);
                })
            }
        })
    };

    changeAgentHandler=(e)=>{
        message = "";
        const {agentValues}=this.state;
        if(e.target.name==='active'){
            agentValues[e.target.name]=!agentValues.active;

        }else{
            agentValues[e.target.name]=e.target.value;
        }

        this.setState({agentValues});

        if(!isNaN(this.state.agentValues.agentName)){
            message = "Agent Name Required In Alphabet Characters";
        }
        else if(this.state.agentValues.agentName.length > 40){
            message = "Agent Name Length Required Less Then 40";
        }
        if(!isNaN(this.state.agentValues.companyName))
        {
            message = "Company Name Required In Alphabet Characters";
        }
        else if(this.state.agentValues.companyName.length > 40){
            message = "Company Name Length Required Less Then 40";
        }
        if(isNaN(this.state.agentValues.zipCode))
        {
            message = "Zip Code Required In Number";
        }
        else if(this.state.agentValues.zipCode.length > 11){
            message = "Zip Code Length Required Less Then 11";
        }
        if(this.state.agentValues.state.length===0)
        {
            message = "Select State";
        }
        if(this.state.agentValues.cityId.length===0)
        {
            message = "Select City";
        }
        if(this.state.agentValues.classification.length===0)
        {
            message = "Select Designation";
        }
        if(this.state.agentValues.street.length===0)
        {
            message = "Street Required";
        }
    };

    changeSearchAgentHandler=(e)=> {
        const {searchAgentValues} = this.state;
        searchAgentValues[e.target.name] = e.target.value;
        this.setState({searchAgentValues});
    };

    searchAgentHandler=(e)=>{
        //e.preventDefault();
        this.props.searchAgent(this.state.searchAgentValues);
        this.setState({
            searchAgentValues:{
                agentId:'',
                agentName:'',
                companyName:'',
                zipCode:'',
                serviceId:''
            }
        });
        for(let i=0;i<6;i++){
            document.getElementById(i).checked = false;
        }
        document.getElementsByName('agentId')[0].value="";
        document.getElementsByName('agentName')[0].value="";
        document.getElementsByName('companyName')[0].value="";
        document.getElementsByName('zipCode')[0].value="";

    };

    putAgent = (e) => {
        this.props.updateAgent(this.state.agentValues.agentId,this.state.agentValues);
    };

    render() {

        return (
            <div className="agentprofile">
                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Agent Profile</h3></center>
                </div>

                <Row className="show-grid">
                    <Col md={6} mdPush={6}>
                        <fieldset>
                            <legend>Services</legend>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.props.Services.map((value,index) => {
                                                return <div><Radio id={index} key={index} name="serviceId" onChange={this.changeSearchAgentHandler} value={value.serviceId}  inline>{value.serviceName}</Radio><br /></div>
                                                //return <Checkbox key={index} name="serviceId" onChange={this.changeSearchAgentHandler} value={value.serviceId} >{value.serviceName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup>*/}
                                    {/*<Col smOffset={2} sm={10}>*/}
                                        {/*<Button type="submit">Save</Button>*/}
                                    {/*</Col>*/}
                                {/*</FormGroup>*/}
                            </Form>
                        </fieldset>
                    </Col>

                    <Col md={6} mdPull={6}>
                        <NavLink to="/agentinfo"><Button bsStyle="primary">Add Agent</Button></NavLink><br /><br />
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Agent#
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" onChange={this.changeSearchAgentHandler} name="agentId" placeholder="Search Agent Id..." />
                            </Col>
                        </FormGroup>
                        <br />
                        <br />
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Agent Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" onChange={this.changeSearchAgentHandler} name="agentName" placeholder="Search Agent Name..." />
                            </Col>
                        </FormGroup>
                        <br />
                        <br />
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Company Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" onChange={this.changeSearchAgentHandler} name="companyName" placeholder="Search State..." />
                            </Col>
                        </FormGroup>
                        <br />
                        <br />
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Zip Code
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" onChange={this.changeSearchAgentHandler} name="zipCode" placeholder="Search Zip..." />
                            </Col>
                        </FormGroup>
                        {/*<br />*/}
                        {/*<br />*/}
                        {/*<FormGroup controlId="formHorizontalEmail">*/}
                            {/*<Col componentClass={ControlLabel} sm={2}>*/}
                                {/*Miles*/}
                            {/*</Col>*/}
                            {/*<Col sm={10}>*/}
                                {/*<FormControl type="text" name="miles" placeholder="Search Miles..." />*/}
                            {/*</Col>*/}
                        {/*</FormGroup>*/}
                        <br />
                        <br />
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.searchAgentHandler}>Search</Button>
                            </Col>
                        </FormGroup>
                    </Col>
                </Row>

                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Searching Results</h3></center>
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Agent Name</th>
                        <th>City</th>
                        <th>Contact Type</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Classification</th>
                        {/*<th>Action</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.Searching.length===0 ?
                            <tr><td colSpan="7"><h4 align="center">Recode Not Found</h4></td></tr> :
                        this.props.Searching.map((value,index) => {
                            return <tr key={index}>
                                <td>{index+1}</td>
                                <td>{value.agentName}</td>
                                <td>{value.cityName}</td>
                                <td>{value.contactType}</td>
                                <td>{value.email}</td>
                                <td>{value.State}</td>
                                <td>{value.classification}</td>
                                {/*<td>*/}
                                    {/*<ButtonToolbar>*/}
                                        {/*<DropdownButton title="Actions" id="dropdown-size-medium">*/}
                                            {/*<MenuItem eventKey="1"><li bsStyle="primary"*/}
                                                                       {/*bsSize="large"*/}
                                                                       {/*onClick={() => {this.setState({ isEditing: true });this.toggleActive();this.agentEdit(value.agentId)} }>Edit</li></MenuItem>*/}
                                            {/*<MenuItem eventKey="2"><li onClick={()=> this.dataDelete(value.agentId)*/}
                                            {/*}>Delete</li></MenuItem>*/}
                                        {/*</DropdownButton>*/}
                                    {/*</ButtonToolbar>*/}

                                {/*</td>*/}
                            </tr>
                        })
                    }
                    </tbody>
                </Table>

                {/*<div className="w3-container w3-padding-32" id="projects">*/}
                    {/*<h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">All Agents</h3>*/}
                {/*</div>*/}
                {/*<Table striped bordered condensed hover>*/}
                    {/*<thead>*/}
                    {/*<tr>*/}
                        {/*<th>#</th>*/}
                        {/*<th>Agent Name</th>*/}
                        {/*<th>Company Name</th>*/}
                        {/*<th>Street</th>*/}
                        {/*<th>State</th>*/}
                        {/*<th>Zip Code</th>*/}
                        {/*<th>Classification</th>*/}
                        {/*<th>Action</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    {/*<tbody>*/}
                        {/*{*/}
                            {/*this.props.agentData.map((value,index) => {*/}
                                {/*return <tr key={index}>*/}
                                    {/*<td>{index+1}</td>*/}
                                    {/*<td>{value.agentName}</td>*/}
                                    {/*<td>{value.companyName}</td>*/}
                                    {/*<td>{value.street}</td>*/}
                                    {/*<td>{value.state}</td>*/}
                                    {/*<td>{value.zipCode}</td>*/}
                                    {/*<td>{value.classification}</td>*/}
                                    {/*<td>*/}
                                        {/*<ButtonToolbar>*/}
                                            {/*<DropdownButton title="Actions" id="dropdown-size-medium">*/}
                                                {/*<MenuItem eventKey="1"><li bsStyle="primary"*/}
                                                                           {/*bsSize="large"*/}
                                                                           {/*onClick={() => {this.setState({ isEditing: true });this.toggleActive();this.agentEdit(value.agentId)} }>Edit</li></MenuItem>*/}
                                                {/*<MenuItem eventKey="2"><li onClick={()=> this.dataDelete(value.agentId)*/}
                                                {/*}>Delete</li></MenuItem>*/}
                                            {/*</DropdownButton>*/}
                                        {/*</ButtonToolbar>*/}

                                    {/*</td>*/}
                                {/*</tr>*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</tbody>*/}
                {/*</Table>*/}
                <div className="modal-container" style={{ height: 200 }}>

                    <Modal
                        show={this.state.isActive}
                        onHide={this.toggleActive}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add Contact
                            </Modal.Title>
                        </Modal.Header>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={5} style={{'width':'100%'}}>
                                <b>{message && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{message}</b>
                            </Col>
                        </FormGroup>
                        <Modal.Body>
                            <div className="firstForm">
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                    <FormGroup>
                                        <Col smOffset={6} sm={2}>
                                            <Checkbox name="active" onChange={this.changeAgentHandler} checked={this.state.agentValues.active}>Inactive</Checkbox>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Agent Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="hidden" name="agentId" value={this.state.agentValues.agentId} />
                                            <FormControl type="text" name="agentName" value={this.state.agentValues.agentName} onChange={this.changeAgentHandler} placeholder="Agent Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Company Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="companyName" value={this.state.agentValues.companyName} onChange={this.changeAgentHandler} placeholder="Company Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalStreet">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Street
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="street" value={this.state.agentValues.street} onChange={this.changeAgentHandler} placeholder="Street..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            State
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="state" onChange={this.getCity} placeholder="State...">
                                                <option value="select state">Select State</option>
                                                {
                                                    this.props.State.map((value,index) => {
                                                        return this.state.agentValues.state===value.state?
                                                            <option selected="true" value={value.state} key={index}>{value.state}</option>
                                                            :  <option value={value.state}>{value.state}</option>
                                                    })
                                                }
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            City
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="cityId" onChange={this.changeAgentHandler} placeholder="City...">
                                                <option value="select city">Select City</option>
                                                {
                                                    this.props.City.map((value,index) => {
                                                        return  <option value={value.cityId} key={index}>{value.cityName}</option>
                                                    })
                                                }
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalZip">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Zip Code
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="zipCode" value={this.state.agentValues.zipCode} onChange={this.changeAgentHandler} placeholder="Zip..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Classification
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="classification" onChange={this.changeAgentHandler} placeholder="select">
                                                <option value="Designation">Designation</option>
                                                <option value="P">P</option>
                                                <option value="Y">Y</option>
                                                <option value="N">N</option>
                                                {
                                                    this.props.agentData.map((value,index) => {
                                                        return this.state.agentValues.classification===value.classification?
                                                            <option selected="true" value={value.classification} key={index}>{value.classification}</option>
                                                            : ''

                                                    })
                                                }
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={4}>
                                            <Button bsStyle="primary" value="Update" onClick={()=>{
                                                this.putAgent();
                                                this.toggleActive();
                                                this.state.isEditing?
                                                    this.setState({isEditing:false}):''
                                            }}>Update</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{
                                this.toggleActive();
                                this.state.isEditing?
                                    this.setState({isEditing:false}):''
                            }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        State:state.states.allState,
        City:state.city.allCity,
        agentData:state.agentData.agentdata,
        Searching:state.agentSearching.searchingData,
        Services:state.agentServices.services,
    }};

const mapDispatchToProps=(dispatch)=>bindActionCreators({allState,allCity,getAgent,delAgent,updateAgent,getAgentServices,searchAgent},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AgentProfile);
