const faker = require('faker'),
    {user}=require('./userModel');

user.sync().then(()=>{
    let arr=["jyoti", "vishnu", "ishwar"];
    for(let i=0;i<3;i++) {
        user.create({
            userName: arr[i],
            email: "lanetteam."+arr[i]+"@gmail.com",
            password: "lanetteam1",
            userType: "A"
        })
    }
    for(let i=0;i<5;i++) {
        user.create({
            userName:faker.name.firstName(),
            email:faker.internet.email(),
            password:faker.internet.password(),
            userType:faker.random.arrayElement(["C","A","U"])
        })
    }
});
