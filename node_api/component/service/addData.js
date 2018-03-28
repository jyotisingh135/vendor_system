const {service}=require('./serviceModel');
var arr=[
    {
        "type":"C",
        "name":"TL"
    },
    {
        "type":"C",
        "name":"LTL"
    },
    {
        "type":"C",
        "name":"Air"
    },
    {
        "type":"C",
        "name":"Hostshot"
    },
    {
        "type":"C",
        "name":"Ocean"
    },
    {
        "type":"C",
        "name":"Rail"
    },
    {
        "type":"C",
        "name":"Asset Based"
    },
    {
        "type":"C",
        "name":"Canadian"
    },
    {
        "type":"A",
        "name":"Trade Show"
    },
    {
        "type":"A",
        "name":"Office Relocation"
    },
    {
        "type":"A",
        "name":"HHG Agent"
    },
    {
        "type":"A",
        "name":"HazMat"
    },
    {
        "type":"A",
        "name":"Express Agent"
    },
    {
        "type":"A",
        "name":"WMS"
    }
];
service.sync().then(()=>{
    for(let i=0;i<arr.length;i++) {
        service.create({
            serviceName:arr[i].name,
            type:arr[i].type
        })
    }
});
