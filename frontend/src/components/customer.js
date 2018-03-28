import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,Radio} from 'react-bootstrap';
import {getAgent,pageAction,delAgent,getCustomer,allCity,allState,addCustomer,addProject,addProjectAgent,getProject,getProjectAgent} from "../actionMethod/actions";
class Customer extends Component{
    constructor(){
        super();
        this.state={
            isActive:false,
            isActiveCustomer:false,
            isAgentProject:false,
            pageArr:[],
            recordArr:[],
            customer:{
                customerName:'',
                phone:'',
                cityId:''
            },
            project:{
                projectName:'',
                customerId:''
            },
            projectAgent:{
                projectId:'',
                agentId:''
            }
        }
    }
    toggleAgentProject=()=>{
        this.setState({isAgentProject:!this.state.isAgentProject})

    }
    handleprojectAgent=(e)=>{
    let {projectAgent}=this.state;
    projectAgent[e.target.name]=e.target.value;
    this.setState({projectAgent});
    }
    handleAgentAssign=(e)=>{
        e.preventDefault();
        this.props.addProjectAgent(this.state.projectAgent);
    }
    handleProject=(e)=>{
        e.preventDefault();
        this.props.addProject(this.state.project);
        console.log(this.state.project);
        this.setState({
            project:{
                projectName:'',
                customerId:''
            }
        })
    }
    handleProjectValues=(e)=>{
        let {project} =this.state;
        project[e.target.name]=e.target.value;
        this.setState({project})

    }
    handleSubmitcust=(e)=>{
        e.preventDefault();
        this.props.addCustomer(this.state.customer);
        this.toggleCustomer();
    }
    handleCustomerValues=(e)=>{
        let customer=this.state;
        customer[e.target.name]=e.target.value;
        this.setState({customer})
    }
    toggleCustomer=()=>{
        this.setState({isActiveCustomer:!this.state.isActiveCustomer})
    }
    handleAgentList=(e)=>{
        if(this.state.projectAgent.projectId!==''){
            this.toggleAgentList();
        }

    }
    handleCustomer=(e)=>{
        if(e.target.selectedOptions[0].innerText==='---Add customer---'){
            this.toggleCustomer();
        }
        else{
            this.setState({project:{
                projectName:this.state.project.projectName,
                customerId:e.target.selectedOptions[0].value}})
        }

    }
    toggleAgentList=()=>{
        this.setState({isActive:!this.state.isActive})
    }
    componentWillMount(){
        this.props.getAgent();
        this.props.pageAction(1,3);
        this.props.getCustomer();
        this.props.allState();
        this.props.getProject();
        this.props.getProjectAgent();
    }
    handleState=(e)=>{
        this.props.allCity(e.target.selectedOptions[0].innerText);
    }
    paginate=(val,data)=>{
        const {pageArr}=this.state;
        const {recordArr}=this.state;
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var arr=[];
        var totalPages=Math.ceil(data.length/this.props.page.limit);

            for(var i=1;i<=totalPages;i++){
                arr.push(i);
            }
            recordArr[val]=data.slice(start,last);
        if(totalPages!=1){
            pageArr[val]=arr;
        }
        else{
            pageArr[val]=[];
        }

    }
    render(){
        this.paginate('agentRecord',this.props.agentData);
        this.paginate('agentProjectRecord',this.props.projectAgent);
       // var pagent=this.props.projectAgent.slice(start,last);
        return(<div>
            <fieldset align="left">
                <legend className="legendWidth">
                    <h6>Opportunity Information</h6>
                </legend>
                <div>
                    <FormControl componentClass="select" name="projectId" onChange={this.handleprojectAgent}   required>
                        <option>{'---select project---'}</option>
                        {
                            this.props.project.map((v,i) => {
                                return  <option value={v.projectId}>({v.projectId}) {v.projectName}</option>
                            })
                        }

                    </FormControl>
                    <FormGroup>
                        <Col sm={10} ><br />
                            <Button  bsStyle="primary" onClick={this.handleAgentList}>Assign Agents</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button  bsStyle="primary" onClick={this.toggleAgentProject}>Agents Assignment Details</Button></Col>
                    </FormGroup>
                    <Modal
                        bsSize="large"
                        show={this.state.isActive}
                        onHide={this.toggleAgentList}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Agent Details
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <td colspan={5}>
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
                                        <th>Agent Name</th>
                                        <th>Company Name</th>
                                        <th>classification</th>
                                        <th>Select</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.recordArr['agentRecord'].map((v,i)=>{
                                        return (<tr>
                                            <td>{i+1}</td>
                                            <td>{v.agentName}</td>
                                            <td>{v.companyName}</td>
                                            <td>{v.classification}</td>
                                            <td> <FormGroup>
                                                <Radio name="agentId" value={v.agentId} onChange={this.handleprojectAgent}>{''}</Radio>
                                            </FormGroup></td>
                                        </tr>)
                                    })}
                                    <tr>
                                        <td colSpan={5} align="center">
                                            <FormGroup>
                                                {this.state.pageArr['agentRecord'].map((v)=>{
                                                return <Button onClick={(e)=>{
                                                    e.preventDefault();
                                                    this.props.pageAction(v,this.props.page.limit);
                                                }}>{v}</Button>
                                            })}
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <FormGroup>
                                                <Button type="submit" onClick={(e)=>{this.handleAgentAssign(e)}}>Assign Agent</Button>
                                            </FormGroup>
                                        </td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleAgentList}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        bsSize="large"
                        show={this.state.isAgentProject}
                        onHide={this.toggleAgentProject}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Agent Details
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <td colspan={4}>
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
                                        <th>ProjectId</th>
                                        <th>AgentId</th>
                                        <th>projectName</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.recordArr['agentProjectRecord'].map((v,i)=>{
                                        return (<tr>
                                            <td>{i+1}</td>
                                            <td>{v.projectId}</td>
                                            <td>{v.agentId}</td>
                                            <td>{v.projectName}</td>
                                        </tr>)
                                    })}
                                    <tr align="center">
                                        <td colSpan={5}> {this.state.pageArr['agentProjectRecord'].map((v)=>{
                                            return <Button onClick={(e)=>{
                                                e.preventDefault();
                                                this.props.pageAction(v,this.props.page.limit);
                                            }}>{v}</Button>
                                        })}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleAgentProject}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
               </fieldset>
            <fieldset align="left">
                <legend className="legendWidth">
                    <h6>Project Information</h6>
                </legend>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} className="errMessage" sm={4} offset={6} >
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Project Name
                        </Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Project Name" name="projectName" onChange={this.handleProjectValues} onBlur={this.validateInputs} value={this.state.project.projectName}  required />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Customer Name
                        </Col>
                        <Col sm={6}>
                            <FormControl componentClass="select" name="customerId" onChange={this.handleCustomer}   required>
                                <option>{'---select customer---'}</option>
                                <option>{'---Add customer---'}</option>
                                {
                                    this.props.customer.map((v,i) => {
                                        return  <option value={v.customerId}>{v.customerName}</option>
                                    })
                                }

                            </FormControl>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={8} className={'text-center'} >
                            <Button type="submit" bsStyle="primary" onClick={this.handleProject}>Submit</Button></Col>
                    </FormGroup>
                    <Modal
                        show={this.state.isActiveCustomer}
                        onHide={this.toggleCustomer}
                        container={this}
                        aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Customer Details
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Form horizontal>
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} className="errMessage" sm={4} offset={6} >

                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col sm={10} lgOffset={1}>
                                            <FormControl type="text" placeholder="Customer Name" name="customerName" onChange={this.handleCustomerValues} onBlur={this.validateInputs}  required />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col sm={10} lgOffset={1}>
                                            <FormControl type="number" placeholder="phone" name="phone" onChange={this.handleCustomerValues} onBlur={this.validateInputs}  required />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect">
                                        <Col sm={10} lgOffset={1}>
                                            <FormControl componentClass="select" name="state" onChange={this.handleState} placeholder="City..."   required>
                                                <option>{'---select state---'}</option>
                                                {
                                                    this.props.allStates.map((v,i) => {
                                                        return  <option value={v.cityId}>{v.state}</option>
                                                    })
                                                }
                                            </FormControl>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId="formControlsSelect">
                                        <Col sm={10} lgOffset={1}>
                                            <FormControl componentClass="select" name="cityId" onChange={this.handleCustomerValues} placeholder="City..."   required>
                                                <option>{'---select city---'}</option>
                                                {
                                                    this.props.allCities.map((v,i) => {
                                                        return  <option value={v.cityId}>{v.cityName}</option>
                                                    })
                                                }
                                            </FormControl>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col sm={10} lgOffset={1}>
                                            <Button type="submit" bsStyle="primary" onClick={(e)=>{
                                                this.handleSubmitcust(e);

                                            }}>Submit</Button></Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.toggleCustomer}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </Form></fieldset>
        </div>)
    }
}
const mapStateToProps=(state)=>{
    return({
        agentData:state.agentData.agentdata,
        page:state.Page,
        allCities:state.city.allCity,
        customer:state.customer,
        allStates:state.states.allState,
        project:state.project,
        projectAgent:state.projectAgent
    });

}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getAgent,pageAction,getCustomer,allCity,allState,addCustomer,addProject,addProjectAgent,getProject,getProjectAgent},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Customer);

