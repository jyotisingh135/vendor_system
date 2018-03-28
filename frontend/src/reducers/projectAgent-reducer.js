export default function(state=[],action){
    switch(action.type){
        case 'GET_PROJECT_AGENT':
            return action.payload;
        case 'ADD_PROJECT_AGENT':
            return [...state,action.payload];
    }
    return state;
}