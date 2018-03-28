import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './components.css';
import {allState,allCity,addCarrier,deleteCarrier,updateCarrier,getAllCarrier,addContact,addAttachment,getAllContact,deleteContact,updateCarrierContact,getAllAttachment,delAttachment} from './../actionMethod/actions';
import {Alert,Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';

class Carrier extends Component{
    constructor(){
        super();

        this.handleDismissCarrier = this.handleDismissCarrier.bind(this);

        this.state={
            alertShowCarrier:false,
            carrierData:[],
            errMessage:'',
            errContactMessage:'',
            isActiveContact:false,
            isActiveAttachment:false,
            iscontactEdit:false,
           carrier:{
               statename:'---select state---',
               cityname:'---select city---',
               cityId:'',
               carrierName:'',
               companyName:'',
               classification:'',
               zipCode:'',
               street:'',
               isValid:true,
            },
            attachmentData:{
                fileName:[],
                accessId:''
            },
            contactData:{
                firstName:'',
                lastName:'',
                work:'',
                cell:'',
                email:'',
                contactType:'',
                accessId:'',
                isEdit:false
            }
        }
    }
    handleContactInputs=(e)=>{
        let value=e.target.value;
        let name=e.target.name;
        if(name==='firstName' || name==='lastName'){
            if (!(/^[a-zA-Z]+$/.test(e.target.value)) && value!=='') {
                this.setState({errContactMessage: 'Name should not contain numbers'})
                if(name==='firstName')
                    this.state.contactData.firstName = '';
                else if(name==='lastName')
                    this.state.contactData.lastName = '';
            }
            else{
                this.setState({errContactMessage:''})
            }
        }
        if(name==='work' || name==='cell'){
            if(value.length>13 || value.length<6){
                this.setState({errContactMessage:'Phone no should be between 6 to 13 digits '})
               if(name==='work')
                this.state.contactData.work='';
                else if(name==='cell')
                   this.state.contactData.cell='';

            }
            else{
                this.setState({errContactMessage:''})
            }
        }
        if(name==='email'){
            if(!(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value))){
                this.setState({errContactMessage:'Enter Proper Email Address'})
                this.state.contactData.email='';
            }
            else{
                this.setState({errContactMessage:''})
            }
        }
    }
    handledelAttachment=(e,v)=>{
        if(window.confirm('Are you sure you want to delete the attachment?')){
            this.props.delAttachment(v.attachmentId);
        }

    }
    handleContactEdit=(e,v)=>{
        this.setState({iscontactEdit:true})
        this.setState({
            contactData:v
        })
        this.toggleActiveContact();
        //this.props.updateCarrierContact(this.state.contactData,e.target.id)

    }
    handleContactDelete=(e,v)=>{
        if(window.confirm('Are you sure you want to delete the contact')){
            this.props.deleteContact(v,e.target.id)
        }

    }
    handleFileChange=(e)=>{
        let fileArr=[];
        for(let i=0;i<e.target.files.length;i++){
            fileArr.push(e.target.files[i]);
        }
        this.setState({
            attachmentData:{
                fileName:fileArr,
                accessId:this.state.contactData.accessId
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
    }
    handleContact=(e)=>{
       // e.preventDefault();
        if(e.target.innerText==='save') {
            if (this.state.errContactMessage === '') {
                let {contactData} = this.state;
                if (contactData.firstName !== ''
                    && contactData.lastName !== ''
                    && contactData.cell !== ''
                    && contactData.work !== ''
                    && contactData.email !== ''
                    && contactData.contactType!=='' && contactData.contactType!=='--contact-type--') {
                    this.props.addContact(this.state.contactData);
                    this.toggleActiveContact();

                }
                else{
                    alert('Enter the Contacts details');
                }
            }
        }
        else
        {
            this.props.updateCarrierContact(this.state.contactData,this.state.contactData.contactId);
            this.toggleActiveContact();
        }


    }
    handleCarrierIdChange=(e)=>{
        let {contactData}=this.state;
        contactData["accessId"]=e.target.value;
        this.setState({contactData})

        this.props.getAllContact(e.target.value);
        this.props.getAllAttachment(e.target.value);

    }
    handleContactType=(e)=>{
        let {contactData}=this.state;
        contactData[e.target.name]=e.target.selectedOptions[0].innerText;
        this.setState({contactData})
    }
    handleContactName=(e)=>{
        let {contactData}=this.state;
        contactData[e.target.name]=e.target.value;
        this.setState({contactData})
    }
    handleWorkNo=(e)=>{
        let {contactData}=this.state;
        contactData[e.target.name]=e.target.value;
        this.setState({contactData})
    }
    handleCellNo=(e)=>{
        let {contactData}=this.state;
        contactData[e.target.name]=e.target.value;
        this.setState({contactData})
    }
    handleEmail=(e)=>{
        let {contactData}=this.state;
        contactData[e.target.name]=e.target.value;
        this.setState({contactData})
    }
    componentWillMount() {

        this.props.allState();
        this.props.getAllCarrier();
        this.setState({
            carrierData: this.props.carrier
        })
    }
    handleContactAdd=(e)=>{
        this.setState({iscontactEdit:false});
        this.setState({ contactData:{
            firstName:'',
                lastName:'',
                work:'',
                cell:'',
                email:'',
                contactType:'',
                accessId:this.state.contactData.accessId,
                isEdit:false
        }})
            if(this.state.contactData.accessId!=='' && this.state.contactData.accessId!=='Select Carrier Id'){
                this.toggleActiveContact();
            }else{
                alert('select CarrierId first');
            }

    }
    toggleActiveContact=()=>{
        this.setState({
            isActiveContact:!this.state.isActiveContact,
        });
    };
    toggleAttachment=()=>{
        this.setState({
            isActiveAttachment:!this.state.isActiveAttachment,
        });
    };
    handleState=(e)=>{
        this.props.allCity(e.target.selectedOptions[0].innerText);
        let {carrier}=this.state;
        carrier["statename"]=e.target.selectedOptions[0].innerText;
        this.setState({carrier});
        this.props.allCity(e.target.selectedOptions[0].innerText);
    }
    handleCity=(e)=>{
            let {carrier} = this.state;
            carrier["cityname"]=e.target.selectedOptions[0].innerText;
            carrier["cityId"] = e.target.selectedOptions[0].id
            this.setState({carrier})

    }
    handleName=(e)=>{
            let {carrier}=this.state;
            carrier["carrierName"] = e.target.value
            this.setState({carrier})
    }
    handleCompanyName=(e)=>{
        let {carrier}=this.state;
        carrier["companyName"]=e.target.value
        this.setState({carrier})
    }
    handleSubmit=(e)=> {
        e.preventDefault();
        let {carrier}=this.state;
        if(this.state.errMessage===''){
            if(carrier.zipCode!==''
                && carrier.companyName!==''
                && carrier.carrierName!==''
                && carrier.cityId!==''
                && carrier.street!==''
                && (carrier.classification!=='---classification---' && carrier.classification!=='')
            ){
                this.setState({errMessage:''})
                this.props.addCarrier(this.state.carrier);
                this.setState({carrier:{
                    statename:'---select state---',
                        cityId:'',
                        cityname:'---select city---',
                        carrierName:'',
                        companyName:'',
                        classification:'',
                        zipCode:'',
                        street:'',
                        isValid:true,
                }})
                //alert('data inserted successfully');
                this.setState({
                    alertShowCarrier:true
                })
            }
            else{
                alert('Enter data properly');
            }
        }
        else {
            this.setState({errMessage:'Details are missing fill data properly'})
        }
    }
    handleZip=(e)=>{
        // if(e.target.value.length>6){
        //     this.setState({errMessage:'zipCode should be 6 digits long'})
        // }
        // else{
            let {carrier}=this.state;
            carrier["zipCode"]=e.target.value
            this.setState({carrier});
           // this.setState({errMessage:''})
      //  }



    }
    handleclassification=(e)=>{
        let {carrier}=this.state;
        carrier["classification"]=e.target.selectedOptions[0].innerText;
        this.setState({carrier});
    }
    handleStreet=(e)=>{
        let {carrier}=this.state;
        carrier["street"]=e.target.value
        this.setState({carrier});
    }
    validateInputs=(e)=>{
        let value=e.target.value;
        let name=e.target.name;
        if(name==='Name' || name==='CompanyName'){
            if (!(/^[a-zA-Z ]+$/.test(e.target.value)) && value!==''){
                this.setState({errMessage:'Name should not contain numbers'})
                if(name==="Name")
                this.state.carrier.carrierName='';
                else if(name==="CompanyName")
                    this.state.carrier.companyName='';
            }
            else{
                this.setState({errMessage:''})
            }
        }
        if(name==='ZipCode'){
            if(value.length>6 || value.length<6){
                this.setState({errMessage:'Enter proper Zipcode'})
                this.state.carrier.zipCode='';
            }
            else{
                this.setState({errMessage:''})
            }
        }
        if(name==='state'){
            if(value==='---select state---'){
                this.setState({errMessage:'select State'})
            }
            else{
                this.setState({errMessage:''})
            }
        }
        if(name==='city'){
            if(value==='---select city---'){
                this.setState({errMessage:'select City'})
            }
            else{
                this.setState({errMessage:''})
            }
        }

    }
    handleDismissCarrier() {
        this.setState({ alertShowCarrier: false });
    }
    handleAttachmentToggle=()=>{
        if(this.state.contactData.accessId!=='' && this.state.contactData.accessId!=='Select Carrier Id'){
            this.toggleAttachment();
        }
        else {
            alert('select the carrierId first');
        }


    }
    render(){
        return(
            <div className="carrier">
                {
                    this.state.alertShowCarrier ?
                        <Alert bsStyle="success" onDismiss={this.handleDismissCarrier}>
                            <p><span className="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;&nbsp;Carrier Added Successfully</p>
                        </Alert>
                        : ''
                }
                {/*<div className="w3-container w3-padding-32" id="projects">*/}
                    {/*<h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Carrier Information</h3>*/}
                {/*</div>*/}
                <div className="firstForm">
                    <fieldset align="left">
                        <legend className="legendWidth">
                            <h6>Carrier Information</h6>
                        </legend>
                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} className="errMessage" sm={4} offset={6} >
                                    {this.state.errMessage}
                                </Col>
                            </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="Name" name="Name" onChange={this.handleName} onBlur={this.validateInputs} value={this.state.carrier.carrierName} required />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                CompanyName
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="CompanyName" name="CompanyName" onChange={this.handleCompanyName} onBlur={this.validateInputs} value={this.state.carrier.companyName} required />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={2}>
                                State
                            </Col>
                            <Col sm={6}>
                                <FormControl componentClass="select" name="state" onChange={this.handleState} placeholder="City..."  onBlur={this.validateInputs} required>
                                    <option>{this.state.carrier.statename}</option>
                                    {
                                    this.props.allStates.map((v,i) => {
                                    return  <option value={v.state}>{v.state}</option>
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
                                <FormControl componentClass="select" name="city" onChange={this.handleCity} placeholder="City..." required>
                                    <option selected>{this.state.carrier.cityname}</option>
                                    {
                                    this.props.allCities.map((v,i) => {
                                    return  <option id={v.cityId}>{v.cityName}</option>
                                    })
                                    }
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Street
                            </Col>
                            <Col sm={6}>
                                <FormControl type="text" placeholder="Street" name="Street" onChange={this.handleStreet} value={this.state.carrier.street} required/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Zipcode
                            </Col>
                            <Col sm={6}>
                                <FormControl type="number" placeholder="ZipCode" name="ZipCode" onChange={this.handleZip} onBlur={this.validateInputs} value={this.state.carrier.zipCode} required/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formControlsSelect">
                            <Col componentClass={ControlLabel} sm={2}>
                                Classification
                            </Col>
                            <Col sm={6}>
                                <FormControl componentClass="select" name="classification" onChange={this.handleclassification} required>
                                    <option>{'---classification---'}</option>
                                    <option>A</option>
                                    <option>D</option>
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={6}>
                                <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                            </Col>
                        </FormGroup>
                    </Form></fieldset>
                    <br/>

                  <div>
                      <fieldset align="left">
                          <legend className="legendWidth">
                              <h6>Contact Information</h6>

                          </legend>
                          <div>
                              <FormGroup controlId="formControlsSelect">
                                  <Col componentClass={ControlLabel} sm={1}>
                                      CarrierId
                                  </Col>
                                  <Col sm={2}>
                                      <FormControl componentClass="select" name="accessId" onChange={this.handleCarrierIdChange} >
                                          <option>Select Carrier Id</option>
                                          {this.props.carrier.map((v,i)=>{
                                              return <option value={v.carrierId}>{v.carrierName+'('+v.carrierId+')'}</option>
                                          })}
                                      </FormControl>
                                  </Col>
                              </FormGroup>
                          </div>
                          <br/>
                          <br/>
                          <Table striped bordered condensed hover>
                              <thead>
                              <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>Last Name</th>
                                  <th>work</th>
                                  <th>cell</th>
                                  <th>Email</th>
                                  <th>ContactType</th>
                                  <th>Actions</th>
                                  <th></th>
                              </tr>
                              </thead>
                              <tbody>
                              {this.props.contacts.map((v,i)=>{
                                  return (<tr>
                                      <td>{i+1}</td>
                                      <td>{v.firstName}</td>
                                      <td>{v.lastName}</td>
                                      <td>{v.work}</td>
                                      <td>{v.cell}</td>
                                      <td>{v.email}</td>
                                      <td>{v.contactType}</td>
                                      <td>
                                          <ButtonToolbar>
                                              <DropdownButton title="Actions" id="dropdown-size-medium">
                                                  <MenuItem eventKey="1"  id={v.contactId} onClick={(e)=>{this.handleContactEdit(e,v)}}><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit</MenuItem>
                                                  <MenuItem eventKey="2"><li id={v.contactId} onClick={(e)=>{this.handleContactDelete(e,v)}}><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                              </DropdownButton>
                                          </ButtonToolbar>
                                      </td>
                                  </tr>)
                              })}
                              <tr>
                                  <td colSpan="9">
                                      <FormGroup>
                                          <Button type="submit" onClick={(e)=>{this.handleContactAdd(e)}}>Add Contact</Button>
                                          <Modal
                                              show={this.state.isActiveContact}
                                              onHide={this.toggleActiveContact}
                                              container={this}
                                              aria-labelledby="contained-modal-title">
                                              <Modal.Header closeButton>
                                                  <Modal.Title id="contained-modal-title">
                                                      Add Contact
                                                  </Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                  <div align="center">
                                                      <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={8}  className="errMessage">
                                                                  {this.state.errContactMessage}
                                                              </Col>

                                                          </FormGroup>
                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  First Name
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl type="text" name="firstName" onChange={this.handleContactName} placeholder="First Name..." value={this.state.contactData.firstName} onBlur={this.handleContactInputs}/>
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  Last Name
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl type="text" name="lastName" onChange={this.handleContactName} placeholder="Last Name..." value={this.state.contactData.lastName} onBlur={this.handleContactInputs}/>
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  Work
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl type="number" name="work" onChange={this.handleWorkNo} placeholder="Work..." value={this.state.contactData.work} onBlur={this.handleContactInputs} />
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  Cell
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl type="number" name="cell" onChange={this.handleCellNo} placeholder="Cell..." value={this.state.contactData.cell} onBlur={this.handleContactInputs}/>
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup controlId="formHorizontalEmail">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  Email
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl type="email" name="email" onChange={this.handleEmail} placeholder="Email..." value={this.state.contactData.email} onBlur={this.handleContactInputs}/>
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup controlId="formControlsSelect">
                                                              <Col componentClass={ControlLabel} sm={4}>
                                                                  Contact Type
                                                              </Col>
                                                              <Col sm={6}>
                                                                  <FormControl componentClass="select" name="contactType" onChange={this.handleContactType} placeholder="Contact Type...">
                                                                     <option>{this.state.iscontactEdit?this.state.contactData.contactType:'--contact-type--'}</option>
                                                                      <option value="Main">Main</option>
                                                                      <option value="Car">Car</option>
                                                                      <option value="Home">Home</option>
                                                                      <option value="Work">Work</option>
                                                                      <option value="Pager">Pager</option>
                                                                      <option value="Primary">Primary</option>
                                                                  </FormControl>
                                                              </Col>
                                                          </FormGroup>

                                                          <FormGroup>
                                                              <Col smOffset={4} sm={6}>
                                                                  <Button bsStyle="primary" onClick={(e)=>{
                                                                      this.handleContact(e);
                                                                  }} >{this.state.iscontactEdit?'update':'save'}</Button>
                                                              </Col>
                                                          </FormGroup>
                                                      </Form>
                                                  </div>
                                              </Modal.Body>
                                              <Modal.Footer>
                                                  <Button onClick={this.toggleActiveContact}>Close</Button>
                                              </Modal.Footer>
                                          </Modal>
                                      </FormGroup>
                                  </td>
                              </tr>
                              </tbody>
                          </Table>
                      </fieldset>
                      <div>
                          <fieldset align="left">
                              <legend className="legendWidth">
                                  <h6>Attachment Information</h6>
                              </legend>
                              <Table>
                                  <thead>
                                  <tr>
                                  <th>File</th>
                                  <th>Actions</th>
                                  </tr>
                                  </thead>
                                  {this.props.attachment.map((v,i)=>{
                                      return <tr>
                                          <td><a href={v.fileName}>{v.fileName}</a></td>
                                          <td>
                                              <ButtonToolbar>
                                                  <DropdownButton title="Actions" id="dropdown-size-medium">
                                                      {/*<MenuItem eventKey="1"  id={v.attachmentId} >Edit</MenuItem>*/}
                                                      <MenuItem eventKey="2"><li id={v.attachmentId} onClick={(e)=>{this.handledelAttachment(e,v)}}><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                                  </DropdownButton>
                                              </ButtonToolbar>
                                          </td>
                                      </tr>
                                  })}
                              </Table>
                              <FormGroup>
                                  <Button type="submit" onClick={this.handleAttachmentToggle}>Add Attachments</Button>
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
                             </fieldset>
                      </div>
                  </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return {
        carrier:state.carrier,
        allStates:state.states.allState,
        allCities:state.city.allCity,
        contacts:state.contact,
        attachment:state.attachment

    }
}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({allState,allCity,addCarrier,deleteCarrier,updateCarrier,getAllCarrier,addContact,getAllContact,deleteContact,updateCarrierContact,addAttachment,getAllAttachment,delAttachment},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Carrier);