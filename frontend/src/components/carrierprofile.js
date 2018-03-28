import React from 'react';
import './components.css';
import {NavLink} from 'react-router-dom';
import {getCarrierServices, getEquipment, searchCarrier} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Radio,
    Row,
    Modal,
    Table,
    Checkbox,
    FormGroup,
    Col,
    Button,
    Form,
    FormControl,
    ControlLabel,
    ButtonToolbar,
    DropdownButton,
    MenuItem
} from 'react-bootstrap';

class CarrierProfile extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            type: 'C',
            searchCarrierValues: {
                "carrierId": '',
                "carrierName":'',
                "companyName":'',
                "street":'',
                "zipCode":'',
                "classification":'',
                "serviceId":'',
                "equipmentId":''
            }
        };
    }

    componentWillMount() {
        this.props.getCarrierServices(this.state.type);
        this.props.getEquipment();
    };

    changeSearchCarrierHandler = (e) => {
        let {searchCarrierValues} = this.state;
        searchCarrierValues[e.target.name] = e.target.value;
        this.setState({searchCarrierValues});
    };

    searchCarrierHandler = () => {
        this.props.searchCarrier(this.state.searchCarrierValues);
        this.setState({
            searchCarrierValues: {
                "carrierId": '',
                "carrierName":'',
                "companyName":'',
                "street":'',
                "zipCode":'',
                "classification":'',
                "serviceId":'',
                "equipmentId":''
            }
        });
        for(let i=0;i<8;i++){
            document.getElementById(i).checked = false;
        }

        for(let i=11;i<23;i++){
            document.getElementById(i).checked = false;
        }
        document.getElementsByName('carrierId')[0].value="";
        document.getElementsByName('carrierName')[0].value="";
        document.getElementsByName('companyName')[0].value="";
        document.getElementsByName('street')[0].value="";
        document.getElementsByName('zipCode')[0].value="";
        document.getElementsByName('classification')[0].value="";
    };

    render() {
        return (
            <div className="carrierprofile">
                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Carrier Profile</h3></center>
                </div>

                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <NavLink to="/carrier"><Button bsStyle="primary">Add Carrier</Button></NavLink><br/><br/>
                        <FormGroup controlId="formHorizontalEmail">
                            {/*<Col componentClass={ControlLabel} sm={2}>
                                Carrier Name
                            </Col>*/}
                            <Col sm={10}>
                                <FormControl type="text" name="carrierId" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Carrier Id..."/>
                            </Col>
                            <br />
                            <br />
                            <Col sm={10}>
                                <FormControl type="text" name="carrierName" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Carrier Name..."/>
                            </Col>
                            <br />
                            <br />
                            <Col sm={10}>
                                <FormControl type="text" name="companyName" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Company Name..."/>
                            </Col>
                            <br />
                            <br />
                            <Col sm={10}>
                                <FormControl type="text" name="street" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Street..."/>
                            </Col>
                            <br />
                            <br />
                            <Col sm={10}>
                                <FormControl type="text" name="zipCode" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Zipcode..."/>
                            </Col>
                            <br />
                            <br />
                            <Col sm={10}>
                                <FormControl type="text" name="classification" onChange={this.changeSearchCarrierHandler}
                                             placeholder="Search Classification..."/>
                            </Col>
                            <br />
                            <br />
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.searchCarrierHandler}>Search</Button>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={4}>
                        <fieldset>
                            <legend>Services</legend>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            //console.log("services : -" , this.props.Services)
                                            this.props.Services.map((value, index) => {
                                                return <div><Radio id={index} key={index} name="serviceId" onChange={this.changeSearchCarrierHandler} value={value.serviceId} inline>{value.serviceName}</Radio><br /></div>
                                                //return <Checkbox key={index}>{value.serviceName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>

                                {/*<FormGroup>*/}
                                {/*<Col smOffset={2} sm={10}>*/}
                                {/*<Button type="submit">Submit</Button>*/}
                                {/*</Col>*/}
                                {/*</FormGroup>*/}
                            </Form>
                        </fieldset>
                    </Col>
                    <Col xsHidden md={4}>
                        <fieldset>
                            <legend>Equipments</legend>
                            <Form horizontal>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.props.Equipment.map((value, index) => {
                                                return <div><Radio id={index+11} key={index} name="equipmentId" onChange={this.changeSearchCarrierHandler} value={value.equipmentId} inline>{value.equipmentName}</Radio><br /></div>
                                                //return <Checkbox key={index}>{value.equipmentName}</Checkbox>
                                            })
                                        }
                                    </Col>
                                </FormGroup>

                                {/*<FormGroup>*/}
                                {/*<Col smOffset={2} sm={10}>*/}
                                {/*<Button type="submit">Submit</Button>*/}
                                {/*</Col>*/}
                                {/*</FormGroup>*/}
                            </Form>
                        </fieldset>
                    </Col>
                </Row>

                <div className="w3-container w3-padding-32" id="projects">
                    <center><h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Searching Results</h3></center>
                </div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Carrier Name</th>
                        <th>City</th>
                        <th>Contact Type</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Classification</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.Searching.length===0 ?
                            <tr><td colSpan="7"><h4 align="center">Recode Not Found</h4></td></tr> :
                        this.props.Searching.map((value, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{value.carrierName}</td>
                                <td>{value.cityName}</td>
                                <td>{value.contactType}</td>
                                <td>{value.email}</td>
                                <td>{value.State}</td>
                                <td>{value.classification}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Services: state.carrierServices.services,
        Equipment: state.carrierEquipment.equipment,
        Searching: state.carrierSearching.searchingData
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCarrierServices,
    getEquipment,
    searchCarrier
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CarrierProfile);
