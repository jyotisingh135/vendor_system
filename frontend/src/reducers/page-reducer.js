export default function(state=[],action){
    switch(action.type){
        case 'PAGING':
            return action.payload;
            break;
    }
    return state;
}