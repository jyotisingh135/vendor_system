const faker = require('faker'),
    {carrier}=require('./carrierModel');

carrier.sync().then(()=>{
    for(let i=10;i<20;i++) {
        carrier.create({
            carrierId:'C00'+i+'0',
            carrierName:faker.name.findName(),
            companyName:faker.company.companyName(),
            street:faker.address.streetAddress(),
            cityId: faker.random.number({min:1, max:610}),
            zipCode:faker.address.zipCode(),
            classification:faker.random.arrayElement(["A","D"]),
            active:faker.random.boolean()
        })
    }
})
