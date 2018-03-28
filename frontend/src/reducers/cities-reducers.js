import _ from 'lodash';

export const STATE='state';
export const CITY='city';
const initialState={
    allState:[],
    allCity:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case STATE:
            
            return { ...state,allState:_.cloneDeep(action.payload)};
        case CITY:
            
            return { ...state,allCity:_.cloneDeep(action.payload)};
        default:
            return state;
    }
}