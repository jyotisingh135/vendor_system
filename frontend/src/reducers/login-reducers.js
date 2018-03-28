import _ from 'lodash';

export const LOGIN='login';
export const LOGOUT='logout';
export const ADDUSER='adduser';
const initialState={
    userdata:[],
    user:localStorage.getItem('authUser') || null
};
export default (state=initialState,action)=>{
    switch (action.type){
        case ADDUSER:
            const data = state.userdata;
            data.push(action.payload);
            return { ...state,userdata:_.cloneDeep(data)};
        case 'USER_LOGIN':
            
           // console.log("reducer",user:action.payload);
            return {...state,user:action.payload};
        case 'USER_LOGOUT':
            return action.res;
        default:
            return state;
    }
}