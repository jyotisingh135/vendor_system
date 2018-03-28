export const CARRIERSERVICES='carrierservices';
export const CARRIEREQUIPMENT='carrierEquipment';
export default (state=[],action)=>{
    
    switch (action.type){
        case 'FETCH_CARRIERS':
            console.log('fetch',action.payload);
            return action.payload;
        case 'ADD_CARRIER':
            return [...state,action.payload];
        case 'UPDATE_CARRIERS':
            console.log('carrier',action.payload)
            let arr=[...state];
            let index=arr.findIndex((c)=>c.carrierId===action.payload.carrierId);
            //arr.splice(index,1);
            arr.splice(index,1,action.payload);
            console.log('all carriers',arr);
            return arr;
        case 'DELETE_CARRIERS':
            return [...state].filter((c)=>c.carrierId!==action.payload);
        case CARRIERSERVICES:
            return action.payload;
        case CARRIEREQUIPMENT:
            return action.payload;
        case 'SORTING':
            return action.payload;
        default:
            return state;
    }
}