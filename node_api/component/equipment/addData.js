const {equipment}=require('./equipmentModel');

var arr=["Tradeshow", "Padwrap", "Climate", "High Cube", "Liftgate", "Flatbed", "Heavy Haul/RGN", "Load Bars", "Plywood", "Straps", "e-Tract 2ft", "e-Tract 4ft"];

equipment.sync().then(()=>{
    for(let i=0;i<arr.length;i++) {
        equipment.create({
            equipmentName:arr[i]
        })
    }
});
