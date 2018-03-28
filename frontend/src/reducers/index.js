import {combineReducers} from 'redux';
import login from './login-reducers';
import states from './cities-reducers';
import city from './cities-reducers';
import agentServices from './agentinfo-reducers';
import agentSearching from './agentinfo-reducers';
import carrierServices from './carrier-srv-equ-reducer';
import carrierSearching from './carrier-srv-equ-reducer';
import carrierEquipment from './carrier-srv-equ-reducer';
import agentData from './agentinfo-reducers';
import contactData from './contactinfo-reducers';
import warehouseData from './warehouse-reducer';
import carrier from './carrier-reducer';
import selectCarrier from './select_carrier-reducer';
import attachment from './attachment-reducer';
import contact from './contact-reducer';
import Page from './page-reducer';
import customer from './customer-reducer';
import project from './project-reducer';
import projectAgent from './projectAgent-reducer';
export default combineReducers({Page,login,
    states,city,carrier,
    agentServices,agentData,
    contactData,warehouseData,selectCarrier,customer,project,
    carrierServices,carrierSearching,carrierEquipment,attachment,contact,projectAgent,agentSearching});
