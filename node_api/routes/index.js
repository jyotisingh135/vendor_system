let user=require('../component/user/userController');
let agent=require('../component/agent/agentController');
let carrier=require('../component/carrier/carrierController');
let city=require('../component/city/cityController');
let contact=require('../component/contact/contactController');
let services=require('../component/service/serviceController');
let custoServices=require('../component/custom_service/customServiceController');
let equipment=require('../component/equipment/equipmentController');
let custoEquipment=require('../component/custom_equipment/customEquipmentController');
let attachment=require('../component/attachment/attachmentController');
let warehouse=require('../component/warehouse/warehouseController');
let customer =require('../component/customer/customerController');
let project=require('../component/project/projectController');
let projectagent=require('../component/agent_project/agentProjectController');

exports.route=(app)=>{

    //////////////// Agent ////////////////
    app.post('/api/agent',agent.addAgent);
    app.get('/api/agent', agent.getAgent);
    app.put('/api/agent/:agentId', agent.updateAgent);
    app.delete('/api/agent/:agentId', agent.delAgent);
    app.post('/api/agentSearch',agent.searchAgent);


    //////////////// Login ////////////////
    app.post('/api/login/user',user.addUser);
    app.post('/api/login',user.login);
    app.delete('api/login/:id');


    //////////////// State & City ////////////////
    app.get('/api/state', city.getState);
    app.get('/api/city/:name', city.getCity);
    app.get('/api/citystate/:id',city.getCityState)


    //////////////// Contact ////////////////
    app.post('/api/contact',contact.addCustomer);
    app.get('/api/contact/:id', contact.getCustomer);
    app.put('/api/contact/:id', contact.updateCustomer);
    app.delete('/api/contact/:id', contact.delCustomer);


    //////////////// Services & Equipments ////////////////
    app.get('/api/totservices/:type', services.getTotServices);
    app.get('/api/services/:id', custoServices.getServices);
    app.post('/api/services/:id', custoServices.modifyServices);
    app.get('/api/totequipment', equipment.getTotEquipments);
    app.get('/api/equipment/:id', custoEquipment.getEquipments);
    app.post('/api/equipment/:id', custoEquipment.modifyEquipments);


    //////////////// Carrier ////////////////
    app.post('/api/carrier',carrier.addCarrier);
    app.get('/api/carrier', carrier.getCarrier);
    app.put('/api/carrier/:id', carrier.updateCarrier);
    app.delete('/api/carrier/:id', carrier.delCarrier);
    app.post('/api/carrierSearch',carrier.searchCarrier);


    //////////////// Attachment ////////////////
    app.get('/api/attachment/:id', attachment.getAttachment);
    app.post('/api/attachment/:id',attachment.addAttachment);
    app.put('/api/attachment', attachment.delAttachment);
    app.delete('/api/attachment/:id', attachment.delAttachment);


    //////////////// Warehouse ////////////////
    app.post('/api/warehouse', warehouse.addWarehouse);
    app.get('/api/warehouse/:id', warehouse.getWarehouse);
    app.put('/api/warehouse/:id', warehouse.updateWarehouse);
    app.delete('/api/warehouse/:id', warehouse.delWarehouse);

    ////////////////////customer////////////////
    app.post('/api/customer',customer.addCustomer);
    app.get('/api/customer',customer.getCustomer);
    app.delete('/api/customer/:id',customer.deleteCustomer)
    
    
    //////////////Project///////////////////
    app.post('/api/project',project.addProject);
    app.get('/api/project',project.getProjects);


    /////////////////ProjectAgent////////////////
    app.post('/api/projectagent',projectagent.addProjectAgent);
    app.get('/api/projectagent',projectagent.getProjectAgent);
};
