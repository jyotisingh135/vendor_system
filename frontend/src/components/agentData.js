import React,{Component} from 'react';
import './components.css';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {agentsortAction,allState,allCity,getAgent,pageAction,delAgent,updateAgent} from "../actionMethod/actions";
import {Alert,Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
let message="";
class AgentData extends Component{
    constructor(){
        super();

        this.handleAlertHide = this.handleAlertHide.bind(this);

        this.handleDismissAgentDelete = this.handleDismissAgentDelete.bind(this);
        this.handleDismissAgentUpdate = this.handleDismissAgentUpdate.bind(this);

        this.state = {
            alertShow:false,
            alertShowAgent:{
                agentDelete:false,
                agentUpdate:false
            },
            show: false,
            isActive: false,
            isEditing:false,
            agentValues:{
                agentId:'',
                cityName:'',
                agentName:'',
                cityname:'',
                companyName:'',
                street:'',
                state:'',
                cityId:'',
                zipCode:'',
                classification:'',
                active:''
            }
        };
    }

    componentWillMount(){
        this.props.getAgent();
        this.props.pageAction(1,3);
        this.props.allState();
        this.props.getAgent();
    }

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    }

    handleAlertHide() {
        this.setState({ alertShow: false });
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };

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
        
        // if(window.confirm("Are you sure you want to delete?")){
            this.props.delAgent(this.state.agentId);
            this.setState({
                alertShowAgent:{
                    agentDelete:true
                },
            });
            setTimeout(() => {
                this.setState({
                    alertShowAgent:{
                        agentDelete:false
                    },
                });
            }, 5000);
            this.setState({
                alertShow:false,
            });
        // }
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
                        cityName:value.cityName,
                        companyName:value.companyName,
                        street:value.street,
                        state:value.state,
                        cityId:value.cityId,
                        cityname:value.cityName,
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
            if(e.target.name==='cityId'){
                agentValues["cityName"]=e.target.selectedOptions[0].innerText;
            }

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

    putAgent = (e) => {
        this.props.updateAgent(this.state.agentValues.agentId,this.state.agentValues);
        this.setState({
           alertShowAgent:{
               agentUpdate:true
           }
        });
        setTimeout(() => {
            this.setState({
                alertShowAgent:{
                    agentUpdate:false
                }
            });
        }, 5000);
    };

    handleAgentEdit=(e,v)=>{

    }
    handleAgentDelete=(e)=>{
        if(window.confirm('Are you sure you want to delete the data')){
            this.props.delAgent(e.target.id);
        }

    }

    handleDismissAgentDelete() {
        this.setState({
            alertShowAgent:{
                agentDelete:false
            }
        });
    }

    handleSortAsc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.agentData];
        sortArr.sort((a,b)=>a[fieldname]>b[fieldname]);
        this.props.agentsortAction(sortArr);
    }
    handleSortDesc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.agentData];
        sortArr.sort((a,b)=>a[fieldname]<b[fieldname]);
        this.props.agentsortAction(sortArr);
    }
    handleDismissAgentUpdate() {
        this.setState({
            alertShowAgent:{
                agentUpdate:false
            }
        });
    }

    render(){
        let last=this.props.page.pagenum*this.props.page.limit;
        let start=last-this.props.page.limit;
        let pageArr=[];
        let totalPages=Math.ceil(this.props.agentData.length/this.props.page.limit);
        for(let i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
        const pages=pageArr.map((v)=>{
            return <Button onClick={(e)=>{
                e.preventDefault();
                this.props.pageAction(v,this.props.page.limit);
            }}>{v}</Button>
        });

        let currentRec=this.props.agentData.slice(start,last);

        return(<div>
            {
                this.state.alertShowAgent.agentDelete ?
                    <Alert bsStyle="success" onDismiss={this.handleDismissAgentDelete}>
                        <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Delete Successfully</p>
                    </Alert>
                    : ''
            }
            {
                this.state.alertShowAgent.agentUpdate ?
                    <Alert bsStyle="success" onDismiss={this.handleDismissAgentUpdate}>
                        <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Update Successfully</p>
                    </Alert>
                    : ''
            }

            <div className="modal-container" >
                <Modal style={{'margin-top':'15%'}}
                       show={this.state.alertShow}
                       onHide={this.handleAlertHide}
                       container={this}
                       aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">
                            <div style={{'color':'red'}}><span className="glyphicon glyphicon-warning-sign"></span>&nbsp;&nbsp;&nbsp;Warning Message...</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{'font-size':'18px','font-weight':'bold'}}>
                        Are you sure you want to delete?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.setAgentId}>Yes</Button>
                        <Button onClick={this.handleAlertHide}>No</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <td colspan={8}>
                        <FormControl componentClass="select"  onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerText)}} style={{'width':'20%'}}>
                            <option>Select Recode Number</option>
                            <option>3</option>
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                        </FormControl>
                    </td>
                </tr>
                <tr>
                    <th>#</th>
                    <th>agentName&nbsp;&nbsp;&nbsp;<i className="fa" id='agentName' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='agentName' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>companyName&nbsp;&nbsp;&nbsp;<i className="fa" id='companyName' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='companyName' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>street&nbsp;&nbsp;&nbsp;<i className="fa" id='street' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='street' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>state&nbsp;&nbsp;&nbsp;<i className="fa" id='state' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='state' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>Zipcode</th>
                    <th>classification</th>
                    {/*<th>paymentTerms</th>*/}
                    {/*<th>creditLimit</th>*/}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentRec.map((v,i)=>{
                    return (<tr>
                        <td>{i+1}</td>
                        <td>{v.agentName}</td>
                        <td>{v.companyName}</td>
                        <td>{v.street}</td>
                        <td>{v.state}</td>
                        <td>{v.zipCode}</td>
                        <td>{v.classification}</td>
                        {/*<td>{v.paymentTerms}</td>*/}
                        {/*<td>{v.creditLimit}</td>*/}
                        <td>
                            <ButtonToolbar>
                                <DropdownButton title="Actions" id="dropdown-size-medium">
                                    <MenuItem eventKey="1">
                                        <li bsStyle="primary"
                                            bsSize="large"
                                            onClick={() => {
                                                this.setState({isEditing: true});
                                                this.toggleActive();
                                                this.agentEdit(v.agentId)
                                            }}><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit
                                        </li>
                                    </MenuItem>
                                    <MenuItem eventKey="2">
                                        <li onClick={() => {
                                            this.setState({
                                                alertShow:true,
                                                agentId:v.agentId
                                            });
                                        }
                                        }><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete
                                        </li>
                                    </MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </td>
                    </tr>)
                })}
                <tr>
                    <td colSpan="9" align="center">
                        <FormGroup>
                            {pages}
                            {/*<Button type="submit" onClick={(e)=>{this.handleContactAdd(e)}}>Add Contact</Button>*/}

                        </FormGroup>
                    </td>
                </tr>
                </tbody>
            </Table>
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
                            <Form horizontal onSubmit={(e) => {e.preventDefault();}} style={{'width':'150%'}}>
                                <FormGroup>
                                    <Col smOffset={6} sm={2}>
                                        <Checkbox name="active" onChange={this.changeAgentHandler} checked={this.state.agentValues.active}>Active</Checkbox>
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
                                            <option value={this.state.agentValues.cityId}>{this.state.agentValues.cityName}</option>
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
        </div>);
    }
}
const mapStateToProps=(state)=>{
    return({
        State:state.states.allState,
        City:state.city.allCity,
        agentData:state.agentData.agentdata,
        page:state.Page
    });

}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({agentsortAction,allState,allCity,getAgent,pageAction,delAgent,updateAgent},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(AgentData);