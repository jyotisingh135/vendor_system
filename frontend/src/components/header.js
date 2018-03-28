import React from 'react';
import './components.css';
import logo from '../images/VENDORLOGO.png'
import {DropdownButton,ButtonToolbar,MenuItem,Navbar,NavbarBrand,Nav,NavDropdown} from 'react-bootstrap';
import {logout} from './../actionMethod/actions';
import {bindActionCreators} from 'redux';
import { connect} from 'react-redux';

class Header extends React.Component{

    logoutHandler=(e)=>{
        e.preventDefault();
        this.props.logout();
    };

    render() {
        const showUser=()=>{
            return {authUser:localStorage.getItem('authUser'),userType:localStorage.getItem('userType')};
        };
        let user=localStorage.getItem('userType');
        let u='';
        if(user==='A'){
                u='Admin';
        }
        else if(user==='U'){
            u='Agent';
        }
        else if(user==='C'){
            u='Carrier';
        }
        return (
            <div align='left' >
                {/* Menus */}

                    <Navbar fluid={true}  >

                            <Navbar.Header style={{'font-size':'26px','paddingLeft':'5%'}}>
                                <Navbar.Brand>
                                    <img src={logo} style={{'height':'80px','width':'250px' ,'margin-left':'2px'}}  />
                                    {/*<NavLink to="/" class="w3-bar-item w3-button"><b>Vendor</b> Management</NavLink>*/}
                                </Navbar.Brand>
                            </Navbar.Header>

                        <Nav pullRight>
                        <div className="w3-right w3-hide-small" align='left'>
                            {/*<NavLink to="/" className="w3-bar-item w3-button">Projects</NavLink>*/}
                            {/*<NavLink to="/" className="w3-bar-item w3-button">About</NavLink>*/}
                            {/*<NavLink to="/" className="w3-bar-item w3-button">Contact</NavLink>*/}
                            <div style={{'margin-top':'22%','float':'left','font-size':'25px',}}><span className="glyphicon glyphicon-user"></span></div>&nbsp;&nbsp;&nbsp;
                            <ButtonToolbar style={{'margin-top':'20%','float':'right'}} pullright>
                                <DropdownButton
                                    bsSize="small"
                                    title={u}
                                    id="dropdown-size-small">
                                    <MenuItem eventKey="1">
                                        <img id="profile-img" className="profile-img-card"
                                             src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" style={{'width':'30%','height':'30%'}}/>
                                        <span>{localStorage.getItem('authUser')}</span><br/>
                                        <span>{'User Type :- '+localStorage.getItem('userType')}</span>
                                    </MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey="4"><li onClick={this.logoutHandler}>Logout</li></MenuItem>
                                </DropdownButton>
                            </ButtonToolbar>
                        </div>
                        </Nav>
                    </Navbar>
                    {/*</div>*/}
                 {/*Big Image*/}
                {/*<header className="w3-display-container w3-content w3-wide" id="home">*/}
                        {/*<div className="w3-display-middle w3-margin-top w3-center">*/}
                            {/*<h1 className="w3-xxlarge w3-text-white"><span className="w3-padding w3-black w3-opacity-min"><b>Vendor</b></span> <span class="w3-hide-small w3-text-light-grey">Management</span></h1>*/}
                        {/*</div>*/}
                {/*</header>*/}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{return{
        //user:state.login
}};

const mapDispatchToProps=(dispatch)=>bindActionCreators({logout},dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Header);
