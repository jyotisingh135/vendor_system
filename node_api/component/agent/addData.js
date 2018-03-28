const faker = require('faker'),
    {agent}=require('./agentModel');

agent.sync().then(()=>{
    for(let i=10;i<20;i++) {
        agent.create({
            agentId:'A00'+i+'0',
            agentName: faker.name.findName(),
            companyName: faker.company.companyName(),
            street: faker.address.streetAddress(),
            cityId: faker.random.number({min:1, max:610}),
            zipCode: faker.address.zipCode(),
            classification: faker.random.arrayElement(["P","Y","N"]),
            // coi: faker.random.uuid(),
            paymentTerms: faker.date.future(),
            creditLimit: faker.random.number(),
            active: faker.random.boolean()
        })
    }
});
