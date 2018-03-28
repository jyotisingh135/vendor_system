export default function(state=[],action){
    
    switch(action.type){
        case 'GET_CUSTOMER':
            return action.payload;
        case 'ADD_CUSTOMER':
            return [...state,action.payload];
        case 'DELETE_CUSTOMER':
           // console.log([...state].filter((c)=>c.customerId!==action.payload));
            let arr=[...state];
            return arr.filter((c)=>c.customerId!=action.payload);
        case 'SORTING':
            return action.payload;
    }
    return state;
}