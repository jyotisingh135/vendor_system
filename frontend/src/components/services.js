import React from 'react';
import './components.css';
import {NavLink} from 'react-router-dom';
import {getCarrierServices,getEquipment,getAgentServices,getAgent,getCarrier,addAgentServices,addCarrierEquipment} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Alert,Row,Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
let message="";
class AgentProfile extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.handleAlertHide = this.handleAlertHide.bind(this);
        this.handleDismissAgent = this.handleDismissAgent.bind(this);
        this.handleDismissCarriers = this.handleDismissCarriers.bind(this);
        this.handleDismissCarrierq = this.handleDismissCarrierq.bind(this);

        this.state = {
            alertShow:false,
            agentNumber:'',
            alertShowAgent:false,
            alertShowCarriers:false,
            alertShowCarrierq:false,
            agentType:'A',
            carrierType:'C',
            searchAgentValues:{
                agentId:'',
                agentName:'',
                state:'',
                zipCode:''
            },
            agentService:new Set(),
            agentServicesValues:{
                customSid:'',
                serviceId:[],
                accessId:''
            },
            carrierService:new Set(),
            carrierServicesValues:{
                customSid:'',
                serviceId:[],
                accessId:''
            },
            carrierEquipment:new Set(),
            carrierEquipmentValues:{
                customEid:'',
                equipmentId:[],
                carrierId:''
            },
        };
    }

    componentWillMount(){
        this.props.getAgent();

        this.props.getCarrier();
        this.props.getAgentServices(this.state.agentType);
        this.props.getCarrierServices(this.state.carrierType);
        this.props.getEquipment();
    };

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    }

    changeAgentServicesHandler=(e)=> {
        if(this.state.agentService.has(e.target.value)){
            this.state.agentService.delete(e.target.value);
        }
        else{
            this.state.agentService.add(e.target.value);
        }
        let setConvertedToArray = Array.from(this.state.agentService);
        const {agentServicesValues}=this.state;
        agentServicesValues[e.target.name]=setConvertedToArray;
        this.setState({agentServicesValues});
    };

    handleAlertHide() {
        this.setState({ alertShow: false });
    }

    agentServicesHandle=(e)=>{

        e.preventDefault();
        if(this.state.agentServicesValues.accessId==="" || this.state.agentServicesValues.accessId==="Select Agent Id"){
            this.setState({
                alertShow:true,
                agentNumber:1
            });
        }
        else{
            this.props.addAgentServices(this.state.agentServicesValues.accessId,this.state.agentServicesValues);
            this.setState({
                alertShowAgent:true
            });
            setTimeout(() => {
                this.setState({
                    alertShowAgent:false
                });
            }, 5000);
        }
        for(let i=0;i<6;i++){
            document.getElementById(i).checked = false;
        }
    }

    changeCarrierServicesHandler=(e)=> {
        if(this.state.carrierService.has(e.target.value)){
            this.state.carrierService.delete(e.target.value);
        }
        else{
            this.state.carrierService.add(e.target.value);
        }
        let setConvertedToArray = Array.from(this.state.carrierService);
        const {carrierServicesValues}=this.state;
        carrierServicesValues[e.target.name]=setConvertedToArray;
        this.setState({carrierServicesValues});
    };

    carrierServicesHandle=(e)=>{

        e.preventDefault();
        if(this.state.carrierServicesValues.accessId==="" || this.state.carrierServicesValues.accessId==="Select Carrier Id"){
            this.setState({
                alertShow:true,
                agentNumber:2
            });
        }
        else{
            this.props.addAgentServices(this.state.carrierServicesValues.accessId,this.state.carrierServicesValues);
            this.setState({
                alertShowCarriers:true
            });
            setTimeout(() => {
                this.setState({
                    alertShowCarriers:false
                });
            }, 5000);
        }
        for(let i=11;i<19;i++){
            document.getElementById(i).checked = false;
        }
    }

    changeCarrierEquipmentHandler=(e)=> {
        if(this.state.carrierEquipment.has(e.target.value)){
            this.state.carrierEquipment.delete(e.target.value);
        }
        else{
            this.state.carrierEquipment.add(e.target.value);
        }
        let setConvertedToArray = Array.from(this.state.carrierEquipment);
        const {carrierEquipmentValues}=this.state;
        carrierEquipmentValues[e.target.name]=setConvertedToArray;
        this.setState({carrierEquipmentValues});
    };

    carrierEquipmentHandle=(e)=>{

        e.preventDefault();
        if(this.state.carrierEquipmentValues.carrierId==="" || this.state.carrierEquipmentValues.carrierId==="Select Carrier Id"){
            this.setState({
                alertShow:true,
                agentNumber:2
            });
        }
        else{
            this.props.addCarrierEquipment(this.state.carrierEquipmentValues.carrierId,this.state.carrierEquipmentValues);
            this.setState({
                alertShowCarrierq:true
            });
            setTimeout(() => {
                this.setState({
                    alertShowCarrierq:true
                });
            }, 5000);
        }
        for(let i=22;i<34;i++){
            document.getElementById(i).checked = false;
        }
    }

    changeShowAgentId = (e) =>{

        const {agentServicesValues}=this.state;
        agentServicesValues[e.target.name]=e.target.value;
        this.setState({agentServicesValues});
    };

    changeShowCarrierId = (e) =>{

        const {carrierServicesValues}=this.state;
        carrierServicesValues[e.target.name]=e.target.value;
        this.setState({carrierServicesValues});
    };

    changeShowCarrierEqId = (e) =>{

        const {carrierEquipmentValues}=this.state;
        carrierEquipmentValues[e.target.name]=e.target.value;
        this.setState({carrierEquipmentValues});
    };

    handleDismissAgent() {
        this.setState({ alertShowAgent: false });
    }

    handleDismissCarriers() {
        this.setState({ alertShowCarriers: false });
    }

    handleDismissCarrierq() {
        this.setState({ alertShowCarrierq: false });
    }

    render() {

        return (
            <div className="services">
                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Services</h3></center>
                </div>
                {
                    this.state.alertShowAgent ?
                    <Alert bsStyle="success" onDismiss={this.handleDismissAgent}>
                    <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Agent Service Add Successfully</p>
                    </Alert>
                     : ''
                }
                {
                    this.state.alertShowCarriers ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissCarriers}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Carrier Service Add Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowCarrierq ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissCarrierq}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Carrier Equipment Add Successfully</p>
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
                                <div style={{'color':'red'}}><span class="glyphicon glyphicon-alert"></span>&nbsp;&nbsp;&nbsp;Error Message...</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{'font-size':'18px','font-weight':'bold'}}>
                            {
                                this.state.agentNumber===1 ? "Please Select Agent Id" : ''
                            }
                            {
                                this.state.agentNumber===2 ? "Please Select Carrier Id" : ''
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleAlertHide}>Ok</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <fieldset>
                            <legend>Agent Services</legend>
                            <FormGroup controlId="formControlsSelect">
                                {/*<Col componentClass={ControlLabel} sm={4}>*/}
                                    {/*Show Agents Id*/}
                                {/*</Col>*/}
                                <Col sm={6} className="showContact">
                                    <FormControl componentClass="select" name="accessId" onChange={this.changeShowAgentId} placeholder="Contact Type..." style={{'width':'160px'}}>
                                        <option value="Select Agent Id">Select Agent Id</option>
                                        {
                                            this.props.agentData.map((value,index) => {
                                                return  <option value={value.agentId} key={index}>({value.agentId}) {value.agentName}</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.props.agentServices.map((value,index) => {
                                                return <Checkbox id={index} key={index} name="serviceId" onChange={this.changeAgentServicesHandler} value={value.serviceId} >{value.serviceName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button bsStyle="primary" onClick={this.agentServicesHandle}>Save</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </fieldset>
                    </Col>
                    <Col xs={6} md={4}>
                        <fieldset>
                            <legend>Carrier Services</legend>
                            <FormGroup controlId="formControlsSelect">
                                {/*<Col componentClass={ControlLabel} sm={4}>*/}
                                {/*Show Agents Id*/}
                                {/*</Col>*/}
                                <Col sm={6} className="showContact">
                                    <FormControl componentClass="select" name="accessId" onChange={this.changeShowCarrierId} placeholder="Contact Type..." style={{'width':'160px'}}>
                                        <option value="Select Carrier Id">Select Carrier Id</option>
                                        {
                                            this.props.carriers.map((value,index)=>{
                                                return <option value={value.carrierId} key={index}>({value.carrierId}) {value.carrierName}</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.props.carrierServices.map((value, index) => {
                                                return <Checkbox id={index+11} key={index} name="serviceId" onChange={this.changeCarrierServicesHandler} value={value.serviceId}>{value.serviceName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                <Col smOffset={2} sm={10}>
                                <Button bsStyle="primary" onClick={this.carrierServicesHandle}>Save</Button>
                                </Col>
                                </FormGroup>
                            </Form>
                        </fieldset>
                    </Col>
                    <Col xsHidden md={4}>
                        <fieldset>
                            <legend>Carrier Equipments</legend>
                            <FormGroup controlId="formControlsSelect">
                                {/*<Col componentClass={ControlLabel} sm={4}>*/}
                                {/*Show Agents Id*/}
                                {/*</Col>*/}
                                <Col sm={6} className="showContact">
                                    <FormControl componentClass="select" name="carrierId" onChange={this.changeShowCarrierEqId} placeholder="Contact Type..." style={{'width':'160px'}}>
                                        <option value="Select Carrier Id">Select Carrier Id</option>
                                        {
                                            this.props.carriers.map((value,index)=>{
                                                return <option value={value.carrierId} key={index}>({value.carrierId}) {value.carrierName}</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.props.Equipment.map((value, index) => {
                                                return <Checkbox id={index+22} key={index} name="equipmentId" onChange={this.changeCarrierEquipmentHandler} value={value.equipmentId} >{value.equipmentName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="primary" onClick={this.carrierEquipmentHandle}>Save</Button>
                                </Col>
                                </FormGroup>
                            </Form>
                        </fieldset>
                    </Col>
                </Row>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        State:state.states.allState,
        City:state.city.allCity,
        carriers:state.agentData.carrierId,
        agentData:state.agentData.agentdata,
        Searching:state.agentServices.searchingData,
        agentServices:state.agentServices.services,
        carrierServices:state.carrierServices.services,
        Equipment:state.carrierEquipment.equipment
    }};

const mapDispatchToProps=(dispatch)=>bindActionCreators({getCarrierServices,getEquipment,getAgentServices,getAgent,getCarrier,addAgentServices,addCarrierEquipment},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AgentProfile);
