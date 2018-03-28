import React from 'react';
import './components.css';
import agent from '../images/agnet.png';

import {NavLink} from 'react-router-dom';


class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="w3-container w3-padding-32" id="projects">
                    <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Projects</h3>
                </div>

                <div className="w3-row-padding center-block">
                    {/*<div className="w3-col l3 m6 w3-margin-bottom">
                        <div className="w3-display-container">
                            <div className="w3-display-topleft w3-black w3-padding">Customers</div>
                            <img src={customer} alt="House"/>
                        </div>
                    </div>*/}
                    <NavLink to="/agentprofile">
                        <img src={agent} alt="House"/>
                    </NavLink>
                    <NavLink to="/carrier">

                    </NavLink> {/*<div className="w3-col l3 m6 w3-margin-bottom">
                        <div className="w3-display-container">
                            <div className="w3-display-topleft w3-black w3-padding">Stores</div>
                            <img src={store} alt="House"/>
                        </div>
                    </div>*/}
                </div>

                <div className="w3-container w3-padding-32" id="about">
                    <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">About</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>



                <div className="w3-container w3-padding-32" id="contact">
                    <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Contact</h3>
                    <p>Lets get in touch and talk about your and our next project.</p>
                    <form action="#" target="_blank">
                        <input className="w3-input" type="text" placeholder="Name" required name="Name"/>
                        <input className="w3-input w3-section" type="text" placeholder="Email" required name="Email"/>
                        <input className="w3-input w3-section" type="text" placeholder="Subject" required
                               name="Subject"/>
                        <input className="w3-input w3-section" type="text" placeholder="Comment" required
                               name="Comment"/>
                        <button className="w3-button w3-black w3-section" type="submit">
                            <i className="fa fa-paper-plane">

                            </i> SEND MESSAGE
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home
