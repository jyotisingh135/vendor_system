import _ from 'lodash';

export const CONTACTINFO='contactinfo';
export const CONTACTDATA='contactdata';
export const CONTACTDELETE='contactdelete';
export const CONTACTUPDATE='contactupdate';
const initialState={
    //data:[],
    contactdata:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case CONTACTINFO:
            
            const addData = state.contactdata;
            addData.push(action.payload);
            return { ...state,contactdata:_.cloneDeep(addData)};
        case CONTACTDATA:
            
            return { ...state,contactdata:_.cloneDeep(action.payload)};
        case CONTACTDELETE:
            
            const delContact = state.contactdata;
            const index = _.findIndex(delContact, { 'contactId': action.payload});
            delContact.splice(index,1);
            return { ...state,contactdata:_.cloneDeep(delContact)};
        case CONTACTUPDATE:
            
            const updateContact = state.contactdata;
            const findid = action.payload;
            const indexfind = _.findIndex(updateContact, {'contactId': findid.contactId});
            updateContact[indexfind] = findid;
            return { ...state,contactdata:_.cloneDeep(updateContact)};
        default:
            return state;
    }
}