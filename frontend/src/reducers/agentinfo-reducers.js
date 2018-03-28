import _ from 'lodash';

export const AGENTINFO='agentinfo';
export const AGENTDATA='agentdata';
export const AGENTDELETE='agentdelete';
export const AGENTUPDATE='agentupdate';
export const AGENTSERVICES='agentservices';
export const SEARCHAGENT='searchAgent';
export const ADDAGENTSERVICES='addagentservices';
export const ADDCARRIEREQUIPMENT='addcarrierequipment'
const initialState={
    searchingData:[],
    agentdata:[],
    services:[],
    carrierId:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case AGENTINFO:
            
            const data = state.agentdata;
            data.push(action.payload);
            return { ...state,agentdata:_.cloneDeep(data)};
        case AGENTDATA:
            
            return { ...state,agentdata:_.cloneDeep(action.payload)};
        case AGENTDELETE:
            
            const delAgent = state.agentdata;
            const index = _.findIndex(delAgent, { 'agentId': action.payload});
            delAgent.splice(index,1);
            return { ...state,agentdata:_.cloneDeep(delAgent)};
        case AGENTUPDATE:
            
            const updateAgent = state.agentdata;
            const findid = action.payload;
            const indexfind = _.findIndex(updateAgent, {'agentId': findid.agentId});
            updateAgent[indexfind] = findid;
            return { ...state,agentdata:_.cloneDeep(updateAgent)};
        case AGENTSERVICES:
            
            return { ...state,services:_.cloneDeep(action.payload)};
        case SEARCHAGENT:
            
            // const searchData = state.searchingData;
            // searchData.push(action.payload);
            return { ...state,searchingData:_.cloneDeep(action.payload)};
            //return { ...state,searchingData:_.cloneDeep(action.payload)};
        case ADDAGENTSERVICES:
            
            return ;
            //return action.payload ;
        case ADDCARRIEREQUIPMENT:
            
            return ;
            //return action.payload ;
        case 'GET_CARRIER':
            return { ...state,carrierId:_.cloneDeep(action.payload)};
        case 'SORTING':
            return { ...state,agentdata:_.cloneDeep(action.payload)};
        default:
            return state;
    }
}