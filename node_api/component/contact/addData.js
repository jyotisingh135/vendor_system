const faker = require('faker'),
    {contact}=require('./contactModel');

contact.sync().then(()=>{
    for(let i=0;i<50;i++) {
        contact.create({
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            work:9876543210,
            cell:9876543210,
            email:faker.internet.email(),
            contactType:faker.random.arrayElement(["Primary", "Work", "Main", "Home", "Pager", "Car"]),
            accessId:faker.random.arrayElement(["A", "C"])+"00"+faker.random.number({min:10, max:19})+"0"
        })
    }
});
