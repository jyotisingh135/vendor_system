export default (state=[],action)=>{
    switch (action.type){
        case 'GET_ALL_CONTACT':
            return action.payload;
        case 'ADD_CONTACT':
            return [...state,action.payload];
        case 'UPDATE_CONTACT':
            let arr=[...state];
            let index=arr.findIndex(c=>c.contactId===action.payload.contactId);
            arr.splice(index,1);
            arr.splice(index,0,action.payload);
            return [...arr];
        case 'DELETE_CONTACT':
            var arr=[...state];

            return [...state].filter(c=>c.contactId!==action.payload.contactId);
            
        default:
            return state;
    }
}