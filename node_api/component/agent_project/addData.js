const faker = require('faker'),
    {agentProject}=require('./agentProjectModel');

agentProject.sync().then(()=>{
    for(let i=0;i<15;i++) {
        agentProject.create({
            projectId:'P00'+faker.random.number({min:10, max:14})+'0',
            agentId:"A00"+faker.random.number({min:10, max:19})+"0"
        })
    }
});
