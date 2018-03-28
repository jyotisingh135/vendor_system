export default (state=[],action)=>{
    switch (action.type){
        case 'GET_CARRIER':
            return action.payload;
        default:
            return state;
    }

}