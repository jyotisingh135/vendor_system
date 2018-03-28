const faker = require('faker'),
    {customer}=require('./customerModel');

customer.sync().then(()=>{
    for(let i=0;i<10;i++) {
        customer.create({
            customerName:faker.name.findName(),
            phone:9876543210,
            cityId:faker.random.number({min:1, max:610})
        })
    }
});
