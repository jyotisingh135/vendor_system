import React,{Component} from 'react';
import './components.css';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';
import {customersortAction,getCustomer,pageAction,deleteCustomer,updateCarrier} from "../actionMethod/actions";
import {Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
class CustomerData extends Component{
    constructor(){
        super();
        this.state={
            isCustomerActive:false
        }

    }
    handleSortAsc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.customer];
        sortArr.sort((a,b)=>a[fieldname]>b[fieldname]);
        console.log('sorted Data',sortArr);
        this.props.customersortAction(sortArr);
    }
    handleSortDesc=(e)=>{
        var fieldname=(e.target.id);
        console.log(fieldname);
        var sortArr=[...this.props.customer];
        sortArr.sort((a,b)=>a[fieldname]<b[fieldname]);
        console.log('sorted Data',sortArr);
        this.props.customersortAction(sortArr);
    }
    toggleActiveCarrier=()=>{
        this.setState({isActiveCarrier:true})
    }
    handleCustomerDelete=(e)=>{
        
        this.props.deleteCustomer(e.target.id)
    }
    componentWillMount(){
        this.props.getCustomer();
        this.props.pageAction(1,10);
    }
    render(){
        var last=this.props.page.pagenum*this.props.page.limit;
        var start=last-this.props.page.limit;
        var pageArr=[];
        var totalPages=Math.ceil(this.props.customer.length/this.props.page.limit);
        for(var i=1;i<=totalPages;i++){
            pageArr.push(i);
        }
        const pages=pageArr.map((v)=>{
            return <Button style={{'background-color':'#FFFBDD'}}onClick={(e)=>{
                e.preventDefault();
                this.props.pageAction(v,this.props.page.limit);
            }}>{v}</Button>
        })

        var currentRec=this.props.customer.slice(start,last);
        return(<div>

            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <td colspan={4}>
                        <FormControl componentClass="select" name="state" onChange={(e)=>{this.props.pageAction(1,e.target.selectedOptions[0].innerText)}} style={{'width':'20%'}}>
                            <option>Select Recode Number</option>
                           <option>3</option>
                            <option>5</option>
                            <option>10</option>
                            <option>20</option>
                        </FormControl>
                    </td>
                </tr>
                <tr>
                    <th>#</th>
                    <th>customerName&nbsp;&nbsp;&nbsp;<i className="fa" id='customerName' onClick={this.handleSortAsc}>&#xf0de;</i>
                        <i className="fa" id='customerName' onClick={this.handleSortDesc}>&#xf0dd;</i></th>
                    <th>phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentRec.map((v,i)=>{
                    return (<tr>
                        <td>{i+1}</td>
                        <td>{v.customerName}</td>
                        <td>{v.phone}</td>
                        <td>
                            <ButtonToolbar>
                                <DropdownButton title="Actions" id="dropdown-size-medium">
                                    <MenuItem eventKey="2"><li id={v.customerId} onClick={(e)=>{this.handleCustomerDelete(e)}}>Delete</li></MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </td>
                    </tr>)
                })}
                <tr>
                    <td colSpan={4} align="center">
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
        customer:state.customer,
        page:state.Page
    });

}
const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({customersortAction,getCustomer,pageAction,deleteCustomer},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomerData);
