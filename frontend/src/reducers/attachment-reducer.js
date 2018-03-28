export default (state=[],action)=>{
    switch (action.type){
        case 'ADD_ATTACHMENT':
            let Arr=[...state];
            for(let i=0;i<action.payload.length;i++){
                Arr.push(action.payload[i]);
            }
            return [...Arr];

        case 'GET_ATTACHMENT':
            return action.payload;
        case 'DELETE_ATTACHMENT':
            return [...state].filter((a)=>a.attachmentId!=action.payload);
        default:
            return state;
    }
}