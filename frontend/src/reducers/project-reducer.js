export default function(state=[],action){
    
    switch(action.type){
        case 'GET_PROJECT':
            return action.payload;
        case 'ADD_PROJECT':
            return [...state,action.payload];
    }
    return state;
}