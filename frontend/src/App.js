import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import { connect} from 'react-redux';
import Login from './components/login';
import Home from './components/home';
import AgentInfo from './components/agentinfo';
import AgentProfile from './components/agentprofile';
import CarrierProfile from './components/carrierprofile';
import Header from './components/header';
import Footer from './components/footer';
import Carrier from './components/carrier';
import Services from './components/services';
import AgentSidebar from './components/agentSidebar';
import CarrierSidebar from './components/carrierSidebar';
import CustomerSidebar from './components/customerSidebar';
import AdminDashboard from './components/admindashboard';
import CarrierData from './components/carrierData';
import AgentData from './components/agentData';
import CommingSoon from './components/commingsoon';
import CustomerData from './components/customerData';
import Customer from './components/customer';

class App extends Component {
    render() {
        //console.log('this.props.users ', this.props.users );
        const PrivateRoute=({component:Component,...rest})=>{
            return (
                <div>
                    <Route {...rest} render={(routeProps)=>(
                        this.props.users ?
                            <div>
                                <Header />
                                <div className="row content">
                                    {
                                        localStorage.getItem('userType')==="A" ? <AgentSidebar /> :''
                                    }
                                    {
                                        localStorage.getItem('userType')==="C" ? <Redirect to=""/> :''
                                    }
                                    {
                                        localStorage.getItem('userType')==="U" ? <Redirect to=""/> :''
                                    }
                                    <div className="col-sm-9">
                                        {localStorage.getItem('userType')==='A'? <Component {...routeProps}/>:''}
                                    </div>
                                </div>
                                <Footer />
                            </div>
                            :<Redirect to="/login"/>)}/>
                </div>
            )

        };
        const PublicRoute=({component:Component,...rest})=>{
            return (
                <Route {...rest} render={(routeProps)=>(
                    (!this.props.users) ?
                        <Component {...routeProps}/>:
                        (this.props.users.msg==="fail")?<Component {...routeProps}/>:<Redirect to="/"/>
                )}/>
            )
        };

        return (
            <BrowserRouter>
                <Switch>
                {/*<div className="App" style={{'backgroundcolor':''}}>*/}
                    <PublicRoute exact path="/login" component={Login}/>
                    <PrivateRoute exact path="/" component={AdminDashboard}/>
                    <PrivateRoute exact path='/customer' component={Customer}/>
                    <PrivateRoute exact path='/carrierData' component={CarrierData}/>
                    <PrivateRoute exact path='/agentData' component={AgentData}/>
                    <PrivateRoute exact path="/agentinfo" component={AgentInfo}/>
                    <PrivateRoute exact path="/agentprofile" component={AgentProfile}/>
                    <PrivateRoute exact path="/carrierprofile" component={CarrierProfile}/>
                    <PrivateRoute exact path="/services" component={Services}/>
                    <PrivateRoute exact path="/agentprofile" component={AgentProfile}/>
                    <PrivateRoute exact path="/carrierprofile" component={CarrierProfile}/>
                    <PrivateRoute exact path="/customerData" component={CustomerData}/>
                    <PrivateRoute exact path="/carrier" component={Carrier}/>
                {/*</div>*/}

                </Switch>
            </BrowserRouter>
        );
    }
}
const mapStateToProps=(state)=>{return{
    users:state.login.user

}};

export default connect(mapStateToProps,null)(App);
