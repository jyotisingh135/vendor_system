import React from 'react';
import {userlogin,logout,addUser} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import './componentLogin.css';
import { connect} from 'react-redux';
import {Modal,Table,Checkbox,FormGroup,Col,Button,Form,FormControl,ControlLabel,ButtonToolbar,DropdownButton,MenuItem} from 'react-bootstrap';
let nameMessage="";
let emailMessage="";
let passwordMessage="";
let typeMessage="";
let confirmMessage="";

class Login extends React.Component{
    constructor(){
        super();

        this.handleAlertHide = this.handleAlertHide.bind(this);

        this.state={
            alertShow:false,
            agentNumber:'',
            isActive: false,
            isEditing:false,
            addUser:{
                userName:'',
                email:'',
                password:'',
                userType:'',
                confirmPassword:'',
                isvalid:false
            },
            userValues:{
                email:'',
                password:''
            }
        }
    }

    handleAlertHide() {
        this.setState({ alertShow: false });
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive,
        });
    };
    componentWillReceiveProps(nextProps){
        this.setState({a:'a'});
    }
    loginHandler=(e)=>{
        
        e.preventDefault();
        let {userValues}=this.state;
        if(userValues.email==='' && userValues.password===''){
            this.setState({
                alertShow:true,
                agentNumber:1
            });
        }
        else{
            this.props.userlogin(this.state.userValues);
        }


            // if(this.user!==undefined || this.user!==null){
            //     this.setState({isValid:true})
            // }
    };
    componentWillReceiveProps(nextProps){
        if(!nextProps.user){
            alert('username or password incorrect');
        }

    }
    addUsers=(e)=>{
        
        //e.preventDefault();
        if(this.state.addUser.userName==="" && this.state.addUser.email==="" && this.state.addUser.password==="" && this.state.addUser.userType==="" && this.state.addUser.confirmPassword===""){
            this.setState({
                alertShow:true,
                agentNumber:3
            });
        }
        else if(nameMessage==="" && emailMessage==="" && passwordMessage==="" && typeMessage==="" && confirmMessage===""){
            this.props.addUser(this.state.addUser);
            this.toggleActive();
            this.state.isEditing?
                this.setState({isEditing:false}):''
            nameMessage="";
            emailMessage="";
            passwordMessage="";
            typeMessage="";
            confirmMessage="";
        }
        else{
            this.setState({

                alertShow:true,
                agentNumber:4
            });
            nameMessage="";
            emailMessage="";
            passwordMessage="";
            typeMessage="";
            confirmMessage="";
        }
    };
    changeHandler=(e)=>{
        emailMessage="";
        passwordMessage="";
        const {userValues}=this.state;
        userValues[e.target.name]=e.target.value;
        this.setState({userValues});

        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com/;
        if (!re.test(this.state.userValues.email)) {
            emailMessage = "Email Is Invalid";
        }
        if(this.state.userValues.password.length < 5){
            passwordMessage = "Password Enter At Least 5 Character";
        }
    };

    loadMethod=()=>{
        if(this.props.user.user!==null && this.props.user.user!==undefined)
        {
            if(this.props.user.user.msg)
                if(this.props.user.user.msg==="fail")
                    this.setState({
                        alertShow:true,
                        agentNumber:2
                    });
        }

    };

    changeHandler1=(e)=>{
        nameMessage="";
        emailMessage="";
        passwordMessage="";
        typeMessage="";
        confirmMessage="";
        const {addUser}=this.state;
        addUser[e.target.name]=e.target.value;
        this.setState({addUser});

        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com/;
        if (!re.test(this.state.addUser.email)) {
            emailMessage = "Email Is Invalid";
        }
        if(this.state.addUser.password.length < 5){
            passwordMessage = "Password Enter At Least 5 Character";
        }
        if(!(this.state.addUser.confirmPassword === this.state.addUser.password)){
            confirmMessage = "Confirm Password Id Invalid";
        }
        if(!isNaN(this.state.addUser.userName)){
            nameMessage = "User Name In Alphabet Characters"
        }
        else if(this.state.addUser.userName.length > 20){
            nameMessage = "User Name Length Less Then 20";
        }
        if(this.state.addUser.userType.length===0)
        {
            typeMessage = "Select User Type";
        }
    };
    render() {
        return (
            <div className="container" onLoad={this.loadMethod}>
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
                                this.state.agentNumber===1 ? "Enter Username And  Password" : ''
                            }
                            {
                                this.state.agentNumber===2 ? "Username And Password Invalid" : ''
                            }
                            {
                                this.state.agentNumber===3 ? "Enter Data Properly" : ''
                            }
                            {
                                this.state.agentNumber===4 ? "Validation Error...!!!" : ''
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleAlertHide}>Ok</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"/>
                    <form className="form-signin">
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               name="email" value={this.state.userValues.email} onChange={this.changeHandler}/>
                        <b>{emailMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{emailMessage}</b>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               name="password" value={this.state.userValues.password} onChange={this.changeHandler} />
                        <b>{passwordMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{passwordMessage}</b>
                        <div id="remember" className="checkbox">
                            {/*<label>*/}
                            {/*<input type="checkbox" value="remember-me"/> Remember me*/}
                            {/*</label>*/}
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.loginHandler}>Sign in</button>
                    </form>

                    <div className="modal-container">
                        <Button
                            bsStyle="primary"
                            bsSize="large"
                            onClick={()=>{this.toggleActive()}}
                            style={{ height: 45 }}
                            className="btn btn-lg btn-primary btn-block btn-signin">
                            Create New User
                        </Button>
                        <Modal
                            show={this.state.isActive}
                            onHide={()=>{
                                nameMessage="";
                                emailMessage="";
                                passwordMessage="";
                                typeMessage="";
                                confirmMessage="";
                                this.toggleActive();
                                this.state.isEditing?
                                    this.setState({isEditing:false}):''
                            }}
                            container={this}
                            aria-labelledby="contained-modal-title">
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title">
                                    Add User
                                </Modal.Title>
                            </Modal.Header>
                            {/*<FormGroup>*/}
                            {/*<Col componentClass={ControlLabel} sm={5} style={{'width':'100%'}}>*/}
                            {/*<b>{nameMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{nameMessage}</b>*/}
                            {/*<b>{emailMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{emailMessage}</b>*/}
                            {/*<b>{passwordMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{passwordMessage}</b>*/}
                            {/*<b>{confirmMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{confirmMessage}</b>*/}
                            {/*<b>{typeMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{typeMessage}</b>*/}
                            {/*</Col>*/}
                            {/*</FormGroup>*/}
                            <Modal.Body>
                                <div className="secondForm" style={{'width':'150%'}}>
                                    <Form horizontal onSubmit={(e) => {e.preventDefault();}}>
                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                User Name
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="text" name="userName" onChange={this.changeHandler1} placeholder="User Name..." />
                                                <b>{nameMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{nameMessage}</b>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Email Name
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="email" name="email" onChange={this.changeHandler1} placeholder="Email Address..." />
                                                <b>{emailMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{emailMessage}</b>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Password
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="password" name="password" onChange={this.changeHandler1} placeholder="Password..." />
                                                <b>{passwordMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{passwordMessage}</b>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formHorizontalEmail">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                Confirm Password
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl type="password" name="confirmPassword" onChange={this.changeHandler1} placeholder="Confirm Password..." />
                                                <b>{confirmMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{confirmMessage}</b>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup controlId="formControlsSelect">
                                            <Col componentClass={ControlLabel} sm={2}>
                                                User Type
                                            </Col>
                                            <Col sm={6}>
                                                <FormControl componentClass="select" name="userType" onChange={this.changeHandler1} placeholder="User Type...">
                                                    <option value="select">Select</option>
                                                    <option value="A">Admin</option>
                                                    <option value="C">Carrier</option>
                                                    <option value="U">Agent</option>
                                                </FormControl>
                                                <b>{typeMessage && <i className="fa" style={{'color':'red'}}>&#xf071;&nbsp;&nbsp;&nbsp;</i>}{typeMessage}</b>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup>
                                            <Col smOffset={2} sm={4}>
                                                {
                                                    this.state.isEditing?
                                                        <Button bsStyle="primary" onClick={()=>{
                                                            nameMessage="";
                                                            emailMessage="";
                                                            passwordMessage="";
                                                            typeMessage="";
                                                            confirmMessage="";
                                                            this.toggleActive();
                                                            this.putContact();
                                                            this.state.isEditing?
                                                                this.setState({isEditing:false}):''
                                                        }} value="Update">Update</Button>
                                                        :
                                                        <Button bsStyle="primary" onClick={()=>{
                                                            this.addUsers();
                                                        }} value="Save">Save</Button>

                                                }
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{
                                    this.toggleActive();
                                    nameMessage="";
                                    emailMessage="";
                                    passwordMessage="";
                                    typeMessage="";
                                    confirmMessage="";
                                    this.state.isEditing?
                                        this.setState({isEditing:false}):''
                                }}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
    user:state.login
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({userlogin,logout,addUser},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Login);