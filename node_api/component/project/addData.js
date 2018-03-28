const faker = require('faker'),
    {project}=require('./projectModel');

project.sync().then(()=>{
    for(let i=10;i<15;i++) {
        project.create({
            projectId:'P00'+i+'0',
            projectName:faker.commerce.productName(),
            customerId:faker.random.number({min:1, max:10})
        })
    }
});
