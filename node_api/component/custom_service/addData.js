const faker = require('faker'),
    {customService}=require('./customServiceModel');

customService.sync().then(()=>{
    for(let i=0;i<15;i++) {
        customService.create({
            serviceId:faker.random.number({min:1, max:10}),
            accessId:faker.random.arrayElement(["A", "C"])+"00"+faker.random.number({min:10, max:19})+"0"
        })
    }
});
