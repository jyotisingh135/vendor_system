import _ from 'lodash';

export const WAREHOUSEINFO='warehouseinfo';
export const WAREHOUSEDATA='warehousedata';
export const WAREHOUSEDELETE='warehousedelete';
export const WAREHOUSEUPDATE='warehouseupdate';
const initialState={
    //data:[],
    warehousedata:[],
};

export default (state=initialState,action)=>{
    switch (action.type){
        case WAREHOUSEINFO:
            
            const addData = state.warehousedata;
            addData.push(action.payload);
            return { ...state,warehousedata:_.cloneDeep(addData)};
        case WAREHOUSEDATA:
            
            return { ...state,warehousedata:_.cloneDeep(action.payload)};
        case WAREHOUSEDELETE:
            
            const delWarehouse = state.warehousedata;
            const index = _.findIndex(delWarehouse, { 'warehouseId': action.payload});
            delWarehouse.splice(index,1);
            return { ...state,warehousedata:_.cloneDeep(delWarehouse)};
        case WAREHOUSEUPDATE:
            
            const updateWarehouse = state.warehousedata;
            const findid = action.payload;
            const indexfind = _.findIndex(updateWarehouse, {'warehouseId': findid.warehouseId});
            updateWarehouse[indexfind] = findid;
            return { ...state,warehousedata:_.cloneDeep(updateWarehouse)};
        default:
            return state;
    }
}