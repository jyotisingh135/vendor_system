const faker = require('faker'),
    {customEquipment}=require('./customEquipmentModel');

customEquipment.sync().then(()=>{
    for(let i=0;i<15;i++) {
        customEquipment.create({
            equipmentId:faker.random.number({min:1, max:12}),
            carrierId:"C00"+faker.random.number({min:10, max:19})+"0"
        })
    }
});
