const faker = require('faker'),
    {attachment}=require('./attactmentModel');

attachment.sync().then(()=>{
    for(let i=0;i<5;i++) {
        attachment.create({
            fileName:faker.image.avatar(),
            accessId:faker.random.arrayElement(["A", "C"])+"00"+faker.random.number({min:10, max:19})+"0"
        })
    }
});
