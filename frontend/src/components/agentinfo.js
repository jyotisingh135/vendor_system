import React from 'react';
import './components.css';
import {NavLink} from 'react-router-dom';
import {allState,allCity,addAgent,getAgent,addContacts,getContacts,delContacts,updateContacts,addWarehouse,getWarehouse,delWarehouse,updateWarehouse,addAttachment,getAllAttachment,delAttachment} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Alert,Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
let agentMessage="";
let contactMessage="";
let warehouseMessage="";

class AgentInfo extends React.Component{
    constructor(props, context) {
        super(props, context);

        this.handleAlertHide = this.handleAlertHide.bind(this);
        this.handleHide = this.handleHide.bind(this);
        // this.handleHide2 = this.handleHide2.bind(this);

        this.handleDismissAgentSave = this.handleDismissAgentSave.bind(this);

        this.handleDismissAgentContactSave = this.handleDismissAgentContactSave.bind(this);
        this.handleDismissAgentContactDelete = this.handleDismissAgentContactDelete.bind(this);
        this.handleDismissAgentContactUpdate = this.handleDismissAgentContactUpdate.bind(this);
        this.handleDismissAgentContactAttachmentSave = this.handleDismissAgentContactAttachmentSave.bind(this);
        this.handleDismissAgentContactAttachmentDelete  = this.handleDismissAgentContactAttachmentDelete.bind(this);

        this.handleDismissAgentWarehouseSave = this.handleDismissAgentWarehouseSave.bind(this);
        this.handleDismissAgentWarehouseDelete = this.handleDismissAgentWarehouseDelete.bind(this);
        this.handleDismissAgentWarehouseUpdate = this.handleDismissAgentWarehouseUpdate.bind(this);

        this.state = {
            alertShow:false,
            agentNumber:'',
            deleteNumber:'',
            alertShowAgent:{
              agentSave:false,
            },
            alertShowContact:{
              agentSave:false,
              agentDelete:false,
              agentUpdate:false
            },
            alertShowContactAttachment:{
                agentSave:false,
                agentDelete:false,
            },
            alertShowWarehouse:{
                agentSave:false,
                agentDelete:false,
                agentUpdate:false
            },
            isActiveAttachment:false,
            isActive: false,
            isEditing:false,
            isActive1: false,
            isEditing1:false,
            isActive2: false,
            isEditing2:false,
            show: false,
            contactId:'',
            warehouseId:'',
            attachmentId:'',
            agentValues:{
                agentName:'',
                companyName:'',
                street:'',
                state:'',
                cityId:'',
                zipCode:'',
                classification:'',
                active:''
            },
            contactValues:{
                contactId:'',
                firstName:'',
                lastName:'',
                work:'',
                cell:'',
                email:'',
                contactType:'',
                accessId:''
            },
            warehouseValues:{
                warehouseId:'',
                warehouseName:'',
                street:'',
                state:'',
                cityId:'',
                cityName:'',
                zipCode:'',
                agentId:''
            },
            attachmentData:{
                attachmentId:'',
                fileName:[],
                accessId:''
            },
        };
    }

    componentWillMount(){
        this.props.allState();
        this.props.getAgent();
        //this.props.allCity();
    };

    handleFileChange=(e)=>{
        let fileArr=[];
        for(let i=0;i<e.target.files.length;i++){
            fileArr.push(e.target.files[i]);
        }
        this.setState({
            attachmentData:{
                fileName:fileArr,
                accessId:this.state.contactValues.accessId
            }
        })
    }
    handleAttachment=(e)=>{
        e.preventDefault();
        let formData=new FormData();

        //  console.log(this.state.attachmentData.filename)
        var arr=[];
        for(let i=0;i<this.state.attachmentData.fileName.length;i++){
            // fileArr.push(e.target.files[i]);
            formData.append('fileName',this.state.attachmentData.fileName[i]);
            arr.push({'fileName':this.state.attachmentData.fileName[i].name,'accessId':this.state.attachmentData.accessId});
        }
        formData.append('accessId',this.state.attachmentData.accessId);
        this.props.addAttachment(formData,this.state.attachmentData.accessId,arr);
        this.setState({
            alertShowContactAttachment:{
                agentSave:true
            }
        });
        setTimeout(() => {
            this.setState({
                alertShowContactAttachment:{
                    agentSave:false
                }
            });
        }, 5000);
    }

    toggleAttachment=()=>{
        this.setState({
            isActiveAttachment:!this.state.isActiveAttachment,
        });
    };

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };

    clearContactData=()=>{
        this.setState({
            isEditing:false,
            contactValues:{
                firstName:'',
                lastName:'',
                work:'',
                cell:'',
                email:'',
                contactType:''
            }
        })
    };

    clearWarehouseData=()=>{
        this.setState({
            isEditing:false,
            warehouseValues:{
                warehouseId:'',
                warehouseName:'',
                street:'',
                state:'',
                cityId:'',
                zipCode:''
            }
        })
    };

    clearAgentData=()=>{
        this.setState({
            agentValues:{
                agentName:'',
                companyName:'',
                street:'',
                state:'',
                cityId:'',
                zipCode:'',
                classification:'',
                active:''
            }
        })
    };

    toggleActive1=()=>{
        this.setState({
            isActive1:!this.state.isActive1,
        });
    };

    toggleActive2=()=>{
        this.setState({
            isActive2:!this.state.isActive2,
        });
    };

    handleHide() {
        this.setState({ show: false });
    }

    handleAlertHide() {
        this.setState({ alertShow: false });
    }
    // handleHide1() {
    //     this.setState({ show1: false });
    // }
    // handleHide2() {
    //     this.setState({ show2: false });
    // }

    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    }

    handlerAgentInfo=(e)=>{

        //e.preventDefault();
        if(this.state.agentValues.agentName==="" && this.state.agentValues.companyName==="" && this.state.agentValues.street==="" && this.state.agentValues.state==="" && this.state.agentValues.city===undefined && this.state.agentValues.zipCode==="" && this.state.agentValues.classification==="")
        {
            this.setState({
                alertShow:true,
                agentNumber:1
            });
        }
        else if(agentMessage===""){
            this.props.addAgent(this.state.agentValues);
            this.toggleActive2();
            this.state.isEditing2?
                this.setState({isEditing2:false}):''
            agentMessage="";
            this.setState({
                alertShowAgent:{
                    agentSave:true
                }
            });
            setTimeout(() => {
                this.setState({
                    alertShowAgent:{
                        agentSave:false
                    }
                });
            }, 5000);
        }
        else {
            this.setState({
                alertShow:true,
                agentNumber:2
            });
            agentMessage="";
        }

    };

    changeAgentHandler=(e)=>{
        agentMessage = "";
        const {agentValues}=this.state;
        agentValues[e.target.name]=e.target.value;
        this.setState({agentValues});
        //let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.edu$/;
        if(!isNaN(this.state.agentValues.agentName)){
            agentMessage = "Agent Name Required In Alphabet Characters";
        }
        else if(this.state.agentValues.agentName.length > 40){
            agentMessage = "Agent Name Length Less Then 40";
        }
        if(!isNaN(this.state.agentValues.companyName))
        {
            agentMessage = "Company Name Required In Alphabet Characters";
        }
        else if(this.state.agentValues.companyName.length > 40){
            agentMessage = "Company Name Length Less Then 40";
        }
        if(this.state.agentValues.street.length===0)
        {
            agentMessage = "Street Required";
        }
        if(isNaN(this.state.agentValues.zipCode))
        {
            agentMessage = "Zip Code Required In Number";
        }
        else if(this.state.agentValues.zipCode.length > 11){
            agentMessage = "Zip Code Length Required Less Then 11";
        }
        if(this.state.agentValues.state.length===0)
        {
            agentMessage = "Select State";
        }
        if(this.state.agentValues.cityId.length===0)
        {
            agentMessage = "Select City";
        }
        if(this.state.agentValues.classification.length===0)
        {
            agentMessage = "Select Designation";
        }
    };

    handlerContact=(e)=>{
        //e.preventDefault();
        if(this.state.contactValues.firstName==="" && this.state.contactValues.lastName==="" && this.state.contactValues.work==="" && this.state.contactValues.cell==="" && this.state.contactValues.email==="" && this.state.contactValues.contactType===""){
            this.setState({
                alertShow:true,
                agentNumber:1
            });
        }
        else if(contactMessage===""){
            this.props.addContacts(this.state.contactValues);
            this.toggleActive();
            this.clearContactData();
            this.state.isEditing?
                this.setState({isEditing:false}):''
            contactMessage="";
            this.setState({
               alertShowContact:{
                   agentSave:true
               }
            });
            setTimeout(() => {
                this.setState({
                    alertShowContact:{
                        agentSave:false
                    }
                });
            }, 5000);
        }
        else {
            this.setState({
                alertShow:true,
                agentNumber:2
            });
            contactMessage="";
        }
    };


    show = () => {

        this.props.getContacts(this.state.contactValues.accessId);
        this.props.getAllAttachment(this.state.contactValues.accessId);
    };

    changeShowContact = (e) =>{

        const {contactValues}=this.state;
        contactValues[e.target.name]=e.target.value;
        this.setState({contactValues},()=>{
            this.show();
        });
    };

    showWarehouse = () => {

        this.props.getWarehouse(this.state.warehouseValues.agentId);
    };

    changeShowWarehouse = (e) =>{

        const {warehouseValues}=this.state;
        warehouseValues[e.target.name]=e.target.value;
        this.setState({warehouseValues},()=>{
            this.showWarehouse();
        });
    };

    setContactId = () => {

        // if(window.confirm("Are you sure you want to delete?")){
            this.props.delContacts(this.state.contactId);
            this.setState({
                alertShowContact:{
                    agentDelete:true
                }
            });
            setTimeout(() => {
                this.setState({
                    alertShowContact:{
                        agentDelete:false
                    }
                });
            }, 5000);
            this.setState({
                alertShow:false
            })
        // }
    };

    contactDataDelete = (data) =>{

        this.setState({
            contactId:data
        },()=>{
            this.setContactId();
        });
    };

    attachment = () => {

        this.props.delAttachment(this.state.attachmentId);
    };

    attachmentDelete = (e) =>{
        // if(window.confirm("Are you sure you want to delete?")){
            this.props.delAttachment(e.target.id);
            this.setState({
                alertShowContactAttachment:{
                    agentDelete:true
                }
            });
            setTimeout(() => {
                this.setState({
                    alertShowContactAttachment:{
                        agentDelete:false
                    }
                });
            }, 5000);
            this.setState({
                alertShow:false
            })
        // }
    };

    setWarehouseId = () => {
        // if(window.confirm("Are you sure you want to delete?")){
            this.props.delWarehouse(this.state.warehouseId);
            this.setState({
                alertShowWarehouse:{
                    agentDelete:true
                }
            });
            setTimeout(() => {
                this.setState({
                    alertShowWarehouse:{
                        agentDelete:false
                    }
                });
            }, 5000);
            this.setState({
                alertShow:false
            });
        // }
    };

    warehouseDelete = (data) =>{

        this.setState({
            warehouseId:data
        },()=>{
            this.setWarehouseId();
        });
    };

    contactEdit = (contactId) =>{
        this.props.contactData.map((value, index) => {
            if(value.contactId===contactId){
                this.setState({
                    contactValues:{
                        contactId:value.contactId,
                        firstName:value.firstName,
                        lastName:value.lastName,
                        work:value.work,
                        cell:value.cell,
                        email:value.email,
                        contactType:value.contactType,
                    }},()=>{
                    //console.log(this.state.userValues.hobby);
                })
            }
        })
    };

    warehouseEdit = (warehouseId) =>{
        this.props.warehouseData.map((value, index) => {
            if(value.warehouseId===warehouseId){
                this.setState({
                    warehouseValues:{
                        warehouseId:value.warehouseId,
                        warehouseName:value.warehouseName,
                        street:value.street,
                        state:value.state,
                        cityId:value.cityId,
                        cityName:value.cityName,
                        zipCode:value.zipCode,
                        agentId:value.agentId
                    }},()=>{
                    //console.log(this.state.userValues.hobby);
                })
            }
        })
    };

    putContact = (e) => {
        this.props.updateContacts(this.state.contactValues.contactId,this.state.contactValues);
        this.setState({
            alertShowContact:{
                agentUpdate:true
            }
        });
        setTimeout(() => {
            this.setState({
                alertShowContact:{
                    agentUpdate:false
                }
            });
        }, 5000);
    };

    putWarehouse = (e) => {
        this.props.updateWarehouse(this.state.warehouseValues.warehouseId,this.state.warehouseValues);
        this.setState({
           alertShowWarehouse:{
               agentUpdate:true
           }
        });
        setTimeout(() => {
            this.setState({
                alertShowWarehouse:{
                    agentUpdate:false
                }
            });
        }, 5000);
    };

    changeContactHandler=(e)=>{
        contactMessage="";
        const {contactValues}=this.state;
        contactValues[e.target.name]=e.target.value;
        this.setState({contactValues});

        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/;
        if(!isNaN(this.state.contactValues.firstName)){
            contactMessage = "First Name Required In Alphabet Characters";
        }
        else if(this.state.contactValues.firstName.length > 25){
            contactMessage = "First Name Length Required Less Then 25";
        }
        if(!isNaN(this.state.contactValues.lastName))
        {
            contactMessage = "Last Name Required In Alphabet Characters";
        }
        else if(this.state.contactValues.lastName.length > 25){
            contactMessage = "Last Name Length Required Less Then 25";
        }
        if(isNaN(this.state.contactValues.work))
        {
            contactMessage = "Work Required In Number";
        }
        else if(this.state.contactValues.work.length > 20){
            contactMessage = "Work Length Required Less Then 20";
        }
        if(isNaN(this.state.contactValues.cell))
        {
            contactMessage = "Cell Required In Number";
        }
        else if(this.state.contactValues.cell.length > 20){
            contactMessage = "Cell Length Required Less Then 20";
        }
        if (!re.test(this.state.contactValues.email)) {
            contactMessage = "Email Is Invalid";
        }
        if(this.state.contactValues.contactType.length===0)
        {
            contactMessage = "Select contactType";
        }
    };

    handlerWarehouse=(e)=>{
        //e.preventDefault();
        if(this.state.warehouseValues.warehouseName==="" && this.state.warehouseValues.street==="" && this.state.warehouseValues.state==="" && this.state.warehouseValues.city===undefined && this.state.warehouseValues.zipCode===""){
            this.setState({
                alertShow:true,
                agentNumber:1
            });
        }
        else if(warehouseMessage===""){
            this.props.addWarehouse(this.state.warehouseValues);
            this.clearWarehouseData();
            this.toggleActive1();
            this.state.isEditing1?
                this.setState({isEditing1:false}):''
            warehouseMessage="";
            this.setState({
                alertShowWarehouse:{
                    agentSave:true
                }
            });
            setTimeout(() => {
                this.setState({
                    alertShowWarehouse:{
                        agentSave:false
                    }
                });
            }, 5000);
        }
        else {
            this.setState({
                alertShow:true,
                agentNumber:2
            });
            warehouseMessage="";
        }
    };

    changeWarehouseHandler=(e)=>{
        warehouseMessage="";
        const {warehouseValues}=this.state;
        warehouseValues[e.target.name]=e.target.value;
        if(e.target.name==='cityId'){
            warehouseValues["cityName"]=e.target.selectedOptions[0].innerText;
        }
        this.setState({warehouseValues});

        if(!isNaN(this.state.warehouseValues.warehouseName)){
            warehouseMessage = "Warehouse Name Required In Alphabet Characters";
        }
        else if(this.state.warehouseValues.warehouseName > 50){
            warehouseMessage = "Warehouse Name Length Required Less Then 50";
        }
        if(this.state.warehouseValues.street.length===0)
        {
            warehouseMessage = "Street Required";
        }
        // if(this.state.warehouseValues.state.length===0)
        // {
        //     warehouseMessage = "Select State";
        // }
        if(this.state.warehouseValues.cityId.length===0)
        {
            warehouseMessage = "Select City";
        }
        if(isNaN(this.state.warehouseValues.zipCode))
        {
            warehouseMessage = "Zip Code Required In Number";
        }
        else if(this.state.warehouseValues.zipCode.length > 11){
            warehouseMessage = "Zip Code Length Required Less Then 11";
        }
    };

    initialAgent = () => {

        this.props.allCity(this.state.agentValues.state);
    };

    getAgentCity = (e) =>{

        const {agentValues}=this.state;
        agentValues[e.target.name]=e.target.value;
        this.setState({agentValues},()=>{
            this.initialAgent();
        });
    };

    initialWarehouse = () => {

        this.props.allCity(this.state.warehouseValues.state);
    };

    getWarehouseCity = (e) =>{

        const {warehouseValues}=this.state;
        warehouseValues[e.target.name]=e.target.value;
        this.setState({warehouseValues},()=>{
            this.initialWarehouse();
        });
    };

    downloadFile=(data)=>{
        let win = window.open(`http://${data}`, '_blank');
        win.focus();
    };

    handleDismissAgentSave() {
        this.setState({
            alertShowAgent:{
                agentSave:false
            }
        });
    }

    handleDismissAgentContactSave() {
        this.setState({
            alertShowContact:{
                agentSave:false
            }
        });
    }

    handleDismissAgentContactDelete() {
        this.setState({
            alertShowContact:{
                agentDelete:false
            }
        });
    }

    handleDismissAgentContactUpdate() {
        this.setState({
            alertShowContact:{
                agentUpdate:false
            }
        });
    }

    handleDismissAgentContactAttachmentSave() {
        this.setState({
            alertShowContactAttachment:{
                agentSave:false
            }
        });
    }

    handleDismissAgentContactAttachmentDelete() {
        this.setState({
            alertShowContactAttachment:{
                agentDelete:false
            }
        });
    }

    handleDismissAgentWarehouseSave() {
        this.setState({
            alertShowWarehouse:{
                agentSave:false
            }
        });
    }

    handleDismissAgentWarehouseDelete() {
        this.setState({
            alertShowWarehouse:{
                agentDelete:false
            }
        });
    }

    handleDismissAgentWarehouseUpdate() {
        this.setState({
            alertShowWarehouse:{
                agentUpdate:false
            }
        });
    }

    render() {
        return (
            <div className="agentinfo">
                {
                    this.state.alertShowAgent.agentSave ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentSave}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Add Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowContact.agentSave ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentContactSave}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Contact Add Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowContact.agentDelete ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentContactDelete}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Contact Delete Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowContact.agentUpdate ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentContactUpdate}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Contact Update Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowContactAttachment.agentSave ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentContactAttachmentSave}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Agent Attachment Add Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowContactAttachment.agentDelete ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentContactAttachmentDelete}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Agent Attachment Delete Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowWarehouse.agentSave ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentWarehouseSave}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Warehouse Add Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowWarehouse.agentDelete ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentWarehouseDelete}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Warehouse Delete Successfully</p>
                        </Alert>
                        : ''
                }
                {
                    this.state.alertShowWarehouse.agentUpdate ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissAgentWarehouseUpdate}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;<b>1</b>&nbsp;&nbsp;&nbsp;Agent Warehouse Update Successfully</p>
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
                                {
                                    this.state.agentNumber===4 ?
                                        <div style={{'color':'red'}}><span className="glyphicon glyphicon-warning-sign"></span>&nbsp;&nbsp;&nbsp;Warning Message...</div> :
                                        <div style={{'color':'red'}}><span className="glyphicon glyphicon-alert"></span>&nbsp;&nbsp;&nbsp;Error Message...</div>
                                }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{'font-size':'18px','font-weight':'bold'}}>
                            {
                                this.state.agentNumber===1 ? "Enter " +
                                    "Data Properly" : ''
                            }
                            {
                                this.state.agentNumber===2 ? "Validation Error...!!!" : ''
                            }
                            {
                                this.state.agentNumber===3 ? "Please Select Agent Id" : ''
                            }
                            {
                                this.state.agentNumber===4 ? "Are you sure you want to delete?" : ''
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            {
                                this.state.agentNumber===4 ?
                                    <div>
                                        {
                                            this.state.deleteNumber===1 ? <Button onClick={this.setContactId}>Yes</Button> : ''
                                        }
                                        {
                                            this.state.deleteNumber===2 ? <Button onClick={this.attachmentDelete}>Yes</Button> : ''
                                        }
                                        {
                                            this.state.deleteNumber===3 ? <Button onClick={this.setWarehouseId}>Yes</Button> : ''
                                        }
                                        <Button onClick={this.handleAlertHide}>No</Button>
                                    </div> : <Button onClick={this.handleAlertHide}>Ok</Button>
                            }
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Agent Information</h3></center>
                </div>

                <div className="modal-container">
                    <center><Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={()=>{this.toggleActive2()}}
                        style={{ height: 45 }}>
                        Add Agent
                    </Button></center>
                    <Modal
                        show={this.state.isActive2}
                        onHide={()=>{
                            this.toggleActive2();
                            agentMessage="";
                            this.state.isEditing2?
                                this.setState({isEditing2:false}):''
                        }}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add Agent
                            </Modal.Title>
                        </Modal.Header>
                        {/*<FormGroup>*/}
                            {/*<Col componentClass={ControlLabel} sm={5} style={{'width':'100%'}}>*/}
                                {/*<b>{contactMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{contactMessage}</b>*/}
                            {/*</Col>*/}
                        {/*</FormGroup>*/}
                        <Modal.Body>
                            <div className="thirdForm">
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={5}>
                                        <b>{agentMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{agentMessage}</b>
                                    </Col>
                                </FormGroup>
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                    <FormGroup>
                                        <Col smOffset={2} sm={2}>
                                            <Checkbox name="active" onChange={this.changeAgentHandler} value="true">Active</Checkbox>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Agent Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="agentName" onChange={this.changeAgentHandler} placeholder="Agent Name..." />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Company Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="companyName" onChange={this.changeAgentHandler} placeholder="Company Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalStreet">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Street
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="street" onChange={this.changeAgentHandler} placeholder="Street..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            State
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="state" onChange={this.getAgentCity} placeholder="State...">
                                                <option value="select state">Select State</option>
                                                {
                                                    this.props.State.map((value,index) => {
                                                        return  <option value={value.state}>{value.state}</option>
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
                                                        return  <option value={value.cityId}>{value.cityName}</option>
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
                                            <FormControl type="text" name="zipCode" onChange={this.changeAgentHandler} placeholder="Zip..." />
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
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={5}>
                                            {/*<Button type="reset" onClick={this.clearAgentData}>Reset</Button>&nbsp;&nbsp;&nbsp;*/}
                                            <Button bsStyle="primary" onClick={()=>{
                                                this.handlerAgentInfo();
                                            }}>Save</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{
                                agentMessage="";
                                this.toggleActive2();
                                this.state.isEditing2?
                                    this.setState({isEditing2:false}):''
                            }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Contacts</h3></center>
                </div>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={2}>
                        Show Agent Contact
                    </Col>
                    <Col sm={6} className="showContact">
                        <FormControl componentClass="select" name="accessId" onChange={this.changeShowContact} placeholder="Contact Type...">
                            <option value="Select Agent Id">Select Agent Id</option>
                            {
                                this.props.agentData.map((value,index) => {
                                    return  <option value={value.agentId} key={index}>({value.agentId}) {value.agentName}</option>
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup><br /><br />
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Work</th>
                        <th>Cell</th>
                        <th>Email</th>
                        <th>Contact Type</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.contactData.length===0 ?
                                <tr><td colSpan="8"><h4 align="center">Recode Not Found</h4></td></tr> :
                            this.props.contactData.map((value,index) => {
                                return  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.work}</td>
                                    <td>{value.cell}</td>
                                    <td>{value.email}</td>
                                    <td>{value.contactType}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <DropdownButton title="Actions" id="dropdown-size-medium">
                                                <MenuItem eventKey="1"><li bsStyle="primary"
                                                                           bsSize="large"
                                                                           onClick={() => {this.setState({ isEditing: true });this.toggleActive();this.contactEdit(value.contactId)} }><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit</li></MenuItem>
                                                <MenuItem eventKey="2"><li onClick={()=> {
                                                    this.setState({
                                                       alertShow:true,
                                                       agentNumber:4,
                                                        deleteNumber:1,
                                                       contactId:value.contactId
                                                    });
                                                }
                                                } ><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                            </DropdownButton>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </Table>

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>File Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.Attachment.length===0 ?
                            <tr><td colSpan="8"><h4 align="center">Recode Not Found</h4></td></tr> :
                        this.props.Attachment.map((value,index) => {
                            return  <tr key={index}>
                                <td>{index+1}</td>
                                <td onClick={()=>{this.downloadFile(value.fileName)}}>{value.fileName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <DropdownButton title="Actions" id="dropdown-size-medium">
                                            <MenuItem eventKey="1"><li bsStyle="primary"
                                                                       bsSize="large"
                                                                       onClick={() => {this.setState({ isActiveAttachment: true });this.toggleAttachment();this.contactEdit(value.attachmentId)} }><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit</li></MenuItem>
                                            <MenuItem eventKey="2"><li id={value.attachmentId} onClick={(e)=> {
                                                this.setState({
                                                    alertShow:true,
                                                    agentNumber:4,
                                                    deleteNumber:2,
                                                    attachmentId:value.attachmentId
                                                });
                                            }}><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                        </DropdownButton>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>

                <FormGroup>
                    <center><Button type="submit" onClick={()=>{
                        this.state.contactValues.accessId==="" || this.state.contactValues.accessId==="Select Agent Id"? this.setState({
                            alertShow:true,
                            agentNumber:3
                        }) : this.toggleAttachment()
                    }}>Add Attachments</Button></center>
                    <Modal
                        show={this.state.isActiveAttachment}
                        onHide={this.toggleAttachment}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add Attachments
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="thirdForm">
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}} encType="multipart/form-data" >
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={4}>
                                            Choose File
                                        </Col>
                                        <Col sm={8}>
                                            <FormControl type="file" name="file" multiple="multiple" onChange={this.handleFileChange} />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col sm={10} >
                                            <Button type="submit" bsStyle="primary" onClick={(e)=>{
                                                this.handleAttachment(e);
                                                this.toggleAttachment();
                                            }}>Upload</Button></Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleAttachment}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </FormGroup>

                <div className="modal-container" style={{ height: 200 }}>
                    <center><Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={()=>{
                            this.state.contactValues.accessId==="" || this.state.contactValues.accessId==="Select Agent Id" ? this.setState({
                                alertShow:true,
                                agentNumber:3
                            }) : this.toggleActive()
                        }}
                        style={{ height: 45 }}
                    >
                        Add Contact
                    </Button></center>

                    <Modal
                        show={this.state.isActive}
                        onHide={()=>{
                            this.toggleActive();
                            contactMessage="";
                            this.clearContactData();
                            this.state.isEditing?
                                this.setState({isEditing:false}):''
                        }}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add Contact
                            </Modal.Title>
                        </Modal.Header>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={5} style={{'width':'100%'}}>
                                <b>{contactMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{contactMessage}</b>
                            </Col>
                        </FormGroup>
                        <Modal.Body>
                            <div className="secondForm">
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            First Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="hidden" name="accessId" value={this.state.contactValues.agentId} placeholder="First Name..." />
                                            <FormControl type="text" name="firstName" value={this.state.contactValues.firstName} onChange={this.changeContactHandler} placeholder="First Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Last Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="lastName" value={this.state.contactValues.lastName} onChange={this.changeContactHandler} placeholder="Last Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Work
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="work" value={this.state.contactValues.work} onChange={this.changeContactHandler} placeholder="Work..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Cell
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="cell" value={this.state.contactValues.cell} onChange={this.changeContactHandler} placeholder="Cell..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Email
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="email" name="email" value={this.state.contactValues.email} onChange={this.changeContactHandler} placeholder="Email..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Contact Type
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="contactType" onChange={this.changeContactHandler} placeholder="Contact Type...">
                                                {
                                                    this.props.contactData.map((value,index) => {
                                                        return this.state.contactValues.contactType === value.contactType ?
                                                            <option selected="true" value={value.contactType}
                                                                    key={index}>{value.contactType}</option>
                                                            : ''
                                                    })
                                                }
                                                <option value="select">Select</option>
                                                <option value="Primary">Primary</option>
                                                <option value="Home">Home</option>
                                                <option value="Car">Car</option>
                                                <option value="Pager">Pager</option>
                                                <option value="Main">Main</option>
                                            </FormControl>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={4}>
                                            {
                                                this.state.isEditing?
                                                    <Button bsStyle="primary" onClick={()=>{
                                                        this.toggleActive();
                                                        contactMessage="";
                                                        this.putContact();
                                                        this.clearContactData();
                                                        this.state.isEditing?
                                                            this.setState({isEditing:false}):''
                                                    }} value="Update">Update</Button>
                                                    :
                                                    <Button bsStyle="primary" onClick={()=>{
                                                        this.handlerContact();
                                                    }} value="Save">Save</Button>

                                            }
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{
                                contactMessage="";
                                this.toggleActive();
                                this.clearContactData();
                                this.state.isEditing?
                                    this.setState({isEditing:false}):''
                            }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Primary Warehouse</h3></center>
                </div>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={2} style={{'width':'18%'}}>
                        Show Agent Warehouse
                    </Col>
                    <Col sm={6} className="showContact">
                        <FormControl componentClass="select" name="agentId" onChange={this.changeShowWarehouse} placeholder="Contact Type...">
                            <option value="Select Agent Id">Select Agent Id</option>
                            {
                                this.props.agentData.map((value,index) => {
                                    return  <option value={value.agentId} key={index}>({value.agentId}) {value.agentName}</option>
                                })
                            }
                        </FormControl>
                    </Col>
                </FormGroup>
                <br /><br />
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Warehouse Name</th>
                        <th>Street</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.warehouseData.length===0 ?
                            <tr><td colSpan="8"><h4 align="center">Recode Not Found</h4></td></tr> :
                        this.props.warehouseData.map((value,index) => {
                            return  <tr key={index}>

                                <td>{index+1}</td>
                                <td>{value.warehouseName}</td>
                                <td>{value.street}</td>
                                <td>{value.state}</td>
                                <td>{value.zipCode}</td>
                                <td>
                                    <ButtonToolbar>
                                        <DropdownButton title="Actions" id="dropdown-size-medium">
                                            <MenuItem eventKey="1"><li bsStyle="primary"
                                                                       bsSize="large"
                                                                       onClick={() => {this.setState({ isEditing1: true });this.toggleActive1();this.warehouseEdit(value.warehouseId)} }><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit</li></MenuItem>
                                            <MenuItem eventKey="2"><li onClick={()=> {
                                                this.setState({
                                                    alertShow:true,
                                                    agentNumber:4,
                                                    deleteNumber:3,
                                                    warehouseId:value.warehouseId
                                                });
                                            }
                                            }><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                        </DropdownButton>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
                <div className="modal-container" style={{ height: 60 }}>
                    <center><Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() =>
                            this.state.warehouseValues.agentId==="" || this.state.warehouseValues.agentId==="Select Agent Id"? this.setState({
                                alertShow:true,
                                agentNumber:3
                            }) : this.setState({ show: true })}
                        style={{ height: 45 }}
                    >
                        Show Agent Warehouse History
                    </Button></center>

                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Agent Warehouse History
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Warehouse Name</th>
                                    <th>Agent Name</th>
                                    <th>Street</th>
                                    <th>State</th>
                                    <th>City</th>
                                    <th>Zip Code</th>
                                    {/*<th>Action</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.warehouseData.map((value,index) => {
                                        return  <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{value.warehouseName}</td>
                                            <td>{value.agentName}</td>
                                            <td>{value.street}</td>
                                            <td>{value.state}</td>
                                            <td>{value.cityName}</td>
                                            <td>{value.zipCode}</td>
                                            {/*<td>*/}
                                                {/*<ButtonToolbar>*/}
                                                    {/*<DropdownButton title="Actions" id="dropdown-size-medium">*/}
                                                        {/*<MenuItem eventKey="1"><li bsStyle="primary"*/}
                                                                                   {/*bsSize="large"*/}
                                                                                   {/*onClick={() => {this.setState({ isEditing1: true });this.toggleActive1();this.warehouseEdit(value.warehouseId)} }>Edit</li></MenuItem>*/}
                                                        {/*<MenuItem eventKey="2"><li onClick={()=> this.warehouseDelete(value.warehouseId)*/}
                                                        {/*}>Delete</li></MenuItem>*/}
                                                    {/*</DropdownButton>*/}
                                                {/*</ButtonToolbar>*/}
                                            {/*</td>*/}
                                        </tr>
                                    })
                                }
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="modal-container" style={{ height: 200 }}>
                    <center><Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() =>
                            this.state.warehouseValues.agentId==="" || this.state.warehouseValues.agentId==="Select Agent Id"? this.setState({
                                alertShow:true,
                                agentNumber:3
                            }) : this.toggleActive1()}
                        style={{ height: 45 }}
                    >
                        Add Warehouse
                    </Button></center>

                    <Modal
                        show={this.state.isActive1}
                        onHide={()=>{
                            this.clearWarehouseData();
                            warehouseMessage="";
                            this.toggleActive1();
                            this.state.isEditing1?
                                this.setState({isEditing1:false}):''
                        }}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Add Warehouse
                            </Modal.Title>
                        </Modal.Header>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={5} style={{'width':'100%'}}>
                                <b>{warehouseMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{warehouseMessage}</b>
                            </Col>
                        </FormGroup>
                        <Modal.Body>
                            <div className="thirdForm">
                                <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Warehouse Name
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="hidden" name="agentId" value={this.state.warehouseValues.warehouseId} placeholder="First Name..." />
                                            <FormControl type="text" name="warehouseName" value={this.state.warehouseValues.warehouseName} onChange={this.changeWarehouseHandler} placeholder="Warehouse Name..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formHorizontalStreet">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            Street
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl type="text" name="street" value={this.state.warehouseValues.street} onChange={this.changeWarehouseHandler} placeholder="Street..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup controlId="formControlsSelect">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            State
                                        </Col>
                                        <Col sm={6}>
                                            <FormControl componentClass="select" name="state" onChange={this.getWarehouseCity} placeholder="State...">
                                                <option value="select state">Select State</option>
                                                {
                                                    this.props.State.map((value,index) => {
                                                        return this.state.warehouseValues.state === value.state ?
                                                            <option selected="true" value={value.state}
                                                                    key={index}>{value.state}</option>
                                                            : <option value={value.state}>{value.state}</option>
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
                                            <FormControl componentClass="select" name="cityId" onChange={this.changeWarehouseHandler} placeholder="City...">
                                                <option value={this.state.warehouseValues.cityId}>{this.state.warehouseValues.cityName!==''?this.state.warehouseValues.cityName:'Select City'}</option>
                                                {
                                                    this.props.City.map((value,index) => {
                                                        return  <option value={value.cityId}>{value.cityName}</option>
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
                                            <FormControl type="text" name="zipCode" value={this.state.warehouseValues.zipCode} onChange={this.changeWarehouseHandler} placeholder="Zip..." />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={4}>
                                            {
                                                this.state.isEditing1?
                                                    <Button bsStyle="primary" onClick={()=>{
                                                        warehouseMessage="";
                                                        this.clearWarehouseData();
                                                        this.putWarehouse();
                                                        this.toggleActive1();
                                                        this.state.isEditing1?
                                                            this.setState({isEditing1:false}):''
                                                    }} value="Update">Update</Button>
                                                    :
                                                    <Button bsStyle="primary" onClick={()=>{
                                                        this.handlerWarehouse();
                                                    }} value="Save">Save</Button>

                                            }
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=>{
                                this.toggleActive1();
                                this.clearWarehouseData();
                                warehouseMessage="";
                                this.state.isEditing1?
                                    this.setState({isEditing1:false}):''
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
        contactData:state.contactData.contactdata,
        warehouseData:state.warehouseData.warehousedata,
        Attachment:state.attachment
    }};

const mapDispatchToProps=(dispatch)=>bindActionCreators({allState,allCity,addAgent,getAgent,addContacts,getContacts,delContacts,updateContacts,addWarehouse,getWarehouse,delWarehouse,updateWarehouse,addAttachment,getAllAttachment,delAttachment},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(AgentInfo);
