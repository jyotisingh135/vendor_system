import React,{Component} from 'react';
import './components.css';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {carriersortAction,getAllCarrier,pageAction,deleteCarrier,updateCarrier,allState,allCity} from "../actionMethod/actions";
import {Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
class CarrierData extends Component{
    constructor(){
        super();
        this.state={
            isActiveCarrier:false,
            carrier:{
                cityName:'',
                state:'',
                carrierId:'',
                cityId:'',
                carrierName:'',
                companyName:'',
                classification:'',
                zipCode:'',
                street:'',
                isValid:true,
            }
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('update',this.state.carrier);
        this.props.updateCarrier(this.state.carrier,this.state.carrier.carrierId);
        this.toggleActiveCarrier();
    }
    handleCarrierValues=(e)=>{
        let {carrier}=this.state;
        console.log(e.target.name);
        carrier[e.target.name]=e.target.value;
        if(e.target.name="cityId"){
            console.log('citynmae',e.target.value,'cityid',e.target.value);
            carrier["cityName"]=e.target.selectedOptions[0].innerText;
        }
        this.setState({carrier})
    }
    handleCarrierEdit=(e,v)=>{
        this.setState({
            carrier:  {
                state:v.state,
                cityName:v.cityName,
                carrierId:v.carrierId,
                cityId:v.cityId,
                carrierName:v.carrierName,
                companyName:v.companyName,
                classification:v.classification,
                zipCode:v.zipCode,
                street:v.street,
                isValid:true,
            }})


        this.toggleActiveCarrier();
    }
    handleSortAsc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.carrier];
        sortArr.sort((a,b)=>a[fieldname]>b[fieldname]);
        this.props.carriersortAction(sortArr);
    }
    handleSortDesc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.carrier];
        sortArr.sort((a,b)=>a[fieldname]<b[fieldname]);
        this.props.carriersortAction(sortArr);
    }
    toggleActiveCarrier=()=>{
        this.setState({isActiveCarrier:!this.state.isActiveCarrier})
    }
    handleCarrierDelete=(e)=>{
        if(window.confirm("Are you sure you want to delete the record?")){
            this.props.deleteCarrier(e.target.id)
        }

    }
    componentWillMount(){
        this.props.getAllCarrier();
        this.props.pageAction(1,10);
        this.props.allState();
        this.props.allCity();
    }
    handleState=(e)=>{
        this.props.allCity(e.target.selectedOptions[0].innerText);
        let {carrier}=this.state;
        carrier["state"]=e.target.selectedOptions[0].innerText
        this.setState({carrier});
        this.props.allCity(e.target.selectedOptions[0].innerText);
    }
    render(){
        let {carrier} =this.state;
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var pageArr=[];
        var totalPages=Math.ceil(this.props.carrier.length/this.props.page.limit);
        for(var i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
        const pages=pageArr.map((v)=>{
             return <Button onClick={(e)=>{
                e.preventDefault();
                this.props.pageAction(v,this.props.page.limit);
            }}>{v}</Button>
        })

        var currentRec=this.props.carrier.slice(start,last);
        
        return(<div>
            <Modal
                show={this.state.isActiveCarrier}
                onHide={this.toggleActiveCarrier}
                container={this}
                aria-labelledby="contained-modal-title">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">
                        Update Carrier Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div align="center">
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
                                <Col sm={8} smOffset={1}>
                                    <FormControl type="text" placeholder="Name" name="carrierName" onChange={this.handleCarrierValues} onBlur={this.validateInputs} value={this.state.carrier.carrierName} required />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    CompanyName
                                </Col>
                                <Col sm={8} smOffset={1}>
                                    <FormControl type="text" placeholder="CompanyName" name="companyName" onChange={this.handleCarrierValues} onBlur={this.validateInputs} value={carrier.companyName} required />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    State
                                </Col>
                                <Col sm={8} smOffset={1}>
                                    <FormControl componentClass="select" name="state" onChange={this.handleState} placeholder="City..."  onBlur={this.validateInputs} required>
                                        <option>{this.state.carrier.state}</option>
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
                                <Col sm={8} smOffset={1}>
                                    <FormControl componentClass="select" name="cityId" onChange={this.handleCarrierValues} placeholder="City..." required>
                                        <option>{this.state.carrier.cityName}</option>
                                        {
                                            this.props.allCities.map((v,i) => {
                                                return  <option  value={v.cityId}>{v.cityName}</option>
                                            })
                                        }
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Street
                                </Col>
                                <Col sm={8} smOffset={1}>
                                    <FormControl type="text" placeholder="Street" name="street" onChange={this.handleCarrierValues} value={carrier.street} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Zipcode
                                </Col>
                                <Col sm={8} smOffset={1}>
                                    <FormControl type="number" placeholder="ZipCode" name="zipCode" onChange={this.handleCarrierValues} onBlur={this.validateInputs} value={carrier.zipCode} required/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Classification
                                </Col>
                                <Col sm={8} smOffset={1}>
                                    <FormControl componentClass="select" name="classification" onChange={this.handleCarrierValues} value={carrier.classification} required>
                                        <option>{'---classification---'}</option>
                                        <option>A</option>
                                        <option>D</option>
                                    </FormControl>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={8}>
                                    <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.toggleActiveCarrier}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <td colspan={7}>
                        <FormControl componentClass="select" name="state" onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerText)}} style={{'width':'20%'}}>
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
                    <th>carrierName&nbsp;&nbsp;&nbsp;<i className="fa" id='carrierName' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='carrierName' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>companyName&nbsp;&nbsp;&nbsp;<i className="fa" id='companyName' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='companyName' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>state&nbsp;&nbsp;&nbsp;<i className="fa" id='state' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='state' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>zipcode</th>
                    <th>classification</th>

                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentRec.map((v,i)=>{
                    return (<tr>
                        <td>{i+1}</td>
                        <td>{v.carrierName}</td>
                        <td>{v.companyName}</td>
                        <td>{v.state}</td>
                        <td>{v.zipCode}</td>
                        <td>{v.classification}</td>
                        <td>
                            <ButtonToolbar>
                                <DropdownButton title="Actions" id="dropdown-size-medium">
                                    <MenuItem eventKey="1"  id={v.carrierId} onClick={(e)=>this.handleCarrierEdit(e,v)}><span className="glyphicon">&#xe065;</span>&nbsp;&nbsp;Edit</MenuItem>
                                    <MenuItem eventKey="2"><li id={v.carrierId} onClick={(e)=>{this.handleCarrierDelete(e)}}><span className="glyphicon">&#xe020;</span>&nbsp;&nbsp;Delete</li></MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </td>
                    </tr>)
                })}
                <tr>
                    <td colSpan="8" align="center">
                        <FormGroup>
                            {pages}
                            {/*<Button type="submit" onClick={(e)=>{this.handleContactAdd(e)}}>Add Contact</Button>*/}

                        </FormGroup>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>);
    }
}
const mapStateToProps=(state)=>{
    return({
        carrier:state.carrier,
        page:state.Page,
        allStates:state.states.allState,
        allCities:state.city.allCity,
        citystate:state.city.citystate

    });

}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({carriersortAction,allState,allCity,getAllCarrier,pageAction,deleteCarrier,updateCarrier},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CarrierData);
