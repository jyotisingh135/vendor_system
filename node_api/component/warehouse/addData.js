const faker = require('faker'),
    {warehouse}=require('./warehouseModel');

warehouse.sync().then(()=>{
    for(let i=0;i<10;i++) {
        warehouse.create({
            warehouseName:faker.company.companyName(),
            street:faker.address.streetName(),
            cityId:faker.random.number({min:1, max:610}),
            zipCode:faker.address.zipCode(),
            agentId:"A00"+faker.random.number({min:10, max:19})+"0"
        })
    }
})
