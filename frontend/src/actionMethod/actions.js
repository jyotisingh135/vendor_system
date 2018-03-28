import {ADDUSER} from './../reducers/login-reducers';
import {STATE,CITY} from './../reducers/cities-reducers';
import {AGENTINFO,AGENTDATA,AGENTDELETE,AGENTUPDATE,AGENTSERVICES,SEARCHAGENT,ADDAGENTSERVICES,ADDCARRIEREQUIPMENT} from './../reducers/agentinfo-reducers';
import {CARRIERSERVICES,CARRIEREQUIPMENT, SEARCHCARRIER} from './../reducers/carrier-srv-equ-reducer';
import {CONTACTINFO,CONTACTDATA,CONTACTDELETE,CONTACTUPDATE} from './../reducers/contactinfo-reducers';
import {WAREHOUSEINFO,WAREHOUSEDATA,WAREHOUSEDELETE,WAREHOUSEUPDATE} from './../reducers/warehouse-reducer';
import axios from 'axios';

//const url='http://202.47.116.116:3002/';
const url='http://localhost:3002/';

/* Login Managements */
export const addUser = (user) => {
    return (dispatch) => {

        axios.post(url+'api/login/user',user).then((data) => {

            dispatch({
                type:ADDUSER,
                payload: user
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const userlogin = (info) => {

    //localStorage.setItem('authUser', info.email);
    return (dispatch) => {

        axios.post(url+'api/login', info).then((response) => {
            if(response.data.msg==="success"){
                localStorage.setItem('authUser', info.email);
                localStorage.setItem('userType',response.data.userType);
                // localStorage.setItem('userName',response.data.userName);
            }
            dispatch({
                type: 'USER_LOGIN',
                payload: response.data,

            });
        }).catch((err) => {
           // console.log(err);
        });
    }
};

export const logout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch({type: 'USER_LOGOUT',res:{email:'',userType:'',msg:'fail'}});
    }
};

export const allState = (info) => {
    return (dispatch) => {
        axios.get(url+'api/state').then((result) => {
            dispatch({
                type:STATE,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};
export const getCustomer=()=>{
    return (dispatch) => {
        axios.get(url+'api/customer').then((result) => {
            dispatch({
                type:'GET_CUSTOMER',
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
}
export const deleteCustomer=(id)=>{

    return (dispatch) => {
        axios.delete(url+`api/customer/${id}`).then((result) => {
            dispatch({
                type:'DELETE_CUSTOMER',
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
}

export const allCity = (name) => {
    return (dispatch) => {

        axios.get(url+`api/city/${name}`).then((result) => {

            dispatch({
                type:CITY,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};
export const addCarrier=(carrier)=>{
    return(dispatch)=>{
        axios.post( url+'api/carrier',carrier).then((result)=>{
            dispatch({
                type:'ADD_CARRIER',
                payload:result.data
            })
        })
    }
}

export const getAllCarrier=()=>{
    return (dispatch)=>{
        axios.get(url+'api/carrier').then((result)=>{
            dispatch({type:'FETCH_CARRIERS',payload:result.data})
        })
    }
}
export const getCarrier=()=>{
    return (dispatch)=>{

        axios.get(url+'api/carrier').then((result)=>{

            dispatch({type:'GET_CARRIER',payload:result.data})
        })
    }
}
export const deleteCarrier=(cid)=>{
    return (dispatch)=>{
        axios.delete(url+`api/carrier/${cid}`).then((result)=>{
            dispatch({type:'DELETE_CARRIERS',payload:cid})
        })
    }
}
export const carriersortAction=(sortArr)=>{
    return(
        {type:'SORTING',payload:sortArr})

}
export const agentsortAction=(sortArr)=>{
    return(
        {type:'SORTING',payload:sortArr})

}
export const customersortAction=(sortArr)=>{
    return(
        {type:'SORTING',payload:sortArr})

}
export const updateCarrier=(carrier,cid)=>{

    return (dispatch)=>{
        axios.put(url+`api/carrier/${cid}`,carrier).then((result)=>{
            dispatch({type:'UPDATE_CARRIERS',payload:carrier})
        })
    }
}
export const addAttachment=(formData,accessId,arr)=>{
    return (dispatch)=>{
        axios.post(url+`api/attachment/${accessId}`,formData).then((result)=>{
            dispatch({type:'ADD_ATTACHMENT',payload:arr})
        })
    }
}
export const getAllAttachment=(accessId)=>{
    return (dispatch)=>{
        axios.get(url+`api/attachment/${accessId}`).then((result)=>{
            dispatch({type:'GET_ATTACHMENT',payload:result.data})
        })
    }
}
export const delAttachment=(id)=>{

    return (dispatch)=>{
        axios.delete(url+`api/attachment/${id}`).then((result)=>{
            dispatch({type:'DELETE_ATTACHMENT',payload:id})
        })
    }
}
export const addCustomer=(customer)=>{
    return (dispatch)=>{
        axios.post(url+'api/customer',customer).then((result)=>{
            dispatch({type:'ADD_CUSTOMER',payload:result.data})
        })
    }
}
export const addProject=(project)=>{
    return (dispatch)=>{

        axios.post(url+'api/project',project).then((result)=>{
            dispatch({type:'ADD_PROJECT',payload:result.data})
        })
    }
}
export const addProjectAgent=(projectAgent)=>{
    return (dispatch)=>{
        axios.post(url+'api/projectagent',projectAgent).then((result)=>{
            dispatch({type:'ADD_PROJECT_AGENT',payload:result.data})
        })
    }
}
export const getProjectAgent=()=>{
    return (dispatch)=>{
        axios.get(url+'api/projectagent').then((result)=>{
            dispatch({type:'GET_PROJECT_AGENT',payload:result.data})
        })
    }
}
export const getProject=()=>{
    return (dispatch)=>{
        axios.get(url+'api/project').then((result)=>{
            dispatch({type:'GET_PROJECT',payload:result.data})
        })
    }
}

export const addContact=(contact)=>{
    return (dispatch)=>{
        axios.post(url+'api/contact',contact).then((result)=>{
            dispatch({type:'ADD_CONTACT',payload:result.data})
        })
    }
}
export const updateCarrierContact=(contact,cid)=>{
    return (dispatch)=>{
        axios.put(url+`api/contact/${cid}`,contact).then((result)=>{
            if(result.data.result) {
                dispatch({type: 'UPDATE_CONTACT', payload: contact})
            }
        })
    }
}
export const deleteContact=(contact,cid)=>{
    return (dispatch)=>{
        axios.delete(url+`api/contact/${cid}`).then((result)=>{
            if(result.data.result){
                dispatch({type:'DELETE_CONTACT',payload:contact})
            }
        })
    }
}
export const getAllContact=(cid)=>{

    return (dispatch)=>{
        axios.get(url+`api/contact/${cid}`).then((result)=>{
            dispatch({type:'GET_ALL_CONTACT',payload:result.data})
        })
    }
}


export const pageAction=(pnum,limit)=>{
    return function(dispatch){
        dispatch({type:'PAGING',payload:{'pagenum':pnum,'limit':limit}})
    }
}

/* Agents Actions  */
export const addAgent = (agentInfo) => {
    return (dispatch) => {

        axios.post(url+'api/agent',agentInfo).then((data) => {

            dispatch({
                type:AGENTINFO,
                payload: agentInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getAgent = (agentInfo) => {
    return (dispatch) => {

        axios.get(url+'api/agent').then((result) => {

            dispatch({
                type:AGENTDATA,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const delAgent = (agentId) => {

    return (dispatch) => {
        axios.delete(url+`api/agent/${agentId}`).then((result) => {
            dispatch({
                type: AGENTDELETE,
                payload: agentId
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const updateAgent = (agentId,agentInfo) => {

    return (dispatch) => {
        axios.put(url+`api/agent/${agentId}`,agentInfo).then((result) => {
            dispatch({
                type: AGENTUPDATE,
                payload: agentInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const searchAgent = (agentInfo) => {

    return (dispatch) => {
        axios.post(url+'api/agentSearch',agentInfo).then((result) => {
            dispatch({
                type: SEARCHAGENT,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getAgentServices = (type) => {

    return (dispatch) => {
        axios.get(url+`api/totservices/${type}`).then((result) => {
            dispatch({
                type: AGENTSERVICES,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const addAgentServices = (id,servicesInfo) => {

    return (dispatch) => {
        axios.post(url+`api/services/${id}`,servicesInfo).then((result) => {
            dispatch({
                type: ADDAGENTSERVICES,
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const addCarrierEquipment = (id,equipmentInfo) => {

    return (dispatch) => {
        axios.post(url+`api/equipment/${id}`,equipmentInfo).then((result) => {
            dispatch({
                type: ADDCARRIEREQUIPMENT,
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getCarrierServices = (type) => {

    return (dispatch) => {
        axios.get(url+`api/totservices/${type}`).then((result) => {
            dispatch({
                type: CARRIERSERVICES,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getEquipment = () => {

    return (dispatch) => {
        axios.get(url+'api/totequipment').then((result) => {
            dispatch({
                type: CARRIEREQUIPMENT,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const searchCarrier = (carrierInfo) => {

    return (dispatch) => {
        axios.post(url+'api/carrierSearch',carrierInfo).then((result) => {
            dispatch({
                type: SEARCHCARRIER,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};


/* Contacts Actions For Agents */
export const addContacts = (contactInfo) => {
    return (dispatch) => {

        axios.post(url+'api/contact',contactInfo).then((data) => {

            dispatch({
                type:CONTACTINFO,
                payload: contactInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getContacts = (id) => {
    return (dispatch) => {

        axios.get(url+`api/contact/${id}`).then((result) => {

            dispatch({
                type:CONTACTDATA,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const delContacts = (id) => {

    return (dispatch) => {
        axios.delete(url+`api/contact/${id}`).then((result) => {
            dispatch({
                type: CONTACTDELETE,
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const updateContacts = (id,contactInfo) => {

    return (dispatch) => {
        axios.put(url+`api/contact/${id}`,contactInfo).then((result) => {
            dispatch({
                type: CONTACTUPDATE,
                payload: contactInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};


/* warehouse Actions For Agents */
export const addWarehouse = (warehouseInfo) => {
    return (dispatch) => {

        axios.post(url+'api/warehouse',warehouseInfo).then((data) => {

            dispatch({
                type:WAREHOUSEINFO,
                payload: warehouseInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const getWarehouse = (id) => {
    return (dispatch) => {

        axios.get(url+`api/warehouse/${id}`).then((result) => {

            dispatch({
                type:WAREHOUSEDATA,
                payload: result.data
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const delWarehouse = (id) => {

    return (dispatch) => {
        axios.delete(url+`api/warehouse/${id}`).then((result) => {
            dispatch({
                type: WAREHOUSEDELETE,
                payload: id
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

export const updateWarehouse = (warehouseId,warehouseInfo) => {

    return (dispatch) => {
        axios.put(url+`api/warehouse/${warehouseId}`,warehouseInfo).then((result) => {
            dispatch({
                type: WAREHOUSEUPDATE,
                payload: warehouseInfo
            })
        }).catch((err) => {
            console.log(err);
        });
    }
};

