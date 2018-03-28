import _ from 'lodash';

export const CARRIERSERVICES='carrierservices';
export const CARRIEREQUIPMENT='carrierEquipment';
export const SEARCHCARRIER='carrierSearch';
const initialState={
    services:[],
    equipment:[],
    searchingData:[]
};
export default (state=initialState,action)=>{
    switch (action.type){
        case CARRIERSERVICES:
            return { ...state,services:_.cloneDeep(action.payload)};
        case CARRIEREQUIPMENT:
            return { ...state,equipment:_.cloneDeep(action.payload)};
        case SEARCHCARRIER:
            return { ...state,searchingData:_.cloneDeep(action.payload)};
        default:
            return state;
    }
}