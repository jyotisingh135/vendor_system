# Migrations:

### In Windows :

    node_modules\.bin\sequelize db:migrate:undo:all
    node_modules\.bin\sequelize db:migrate

    node config\AddAllData.js

### In Ubuntu :

    node_modules/.bin/sequelize db:migrate:undo:all
    node_modules/.bin/sequelize db:migrate

    node config/AddAllData.js

# All APIs :-

### State:

    get : /api/state

### City:

    get : /api/city/:stateName

### Agent:
#### Insert

    post : /api/agent

Require:

    {
    	"agentName":"Vishnu",
    	"companyName":"Lanet",
    	"street":"Dumas",
    	"cityId":5,
    	"zipCode":395001,
    	"classification":"P"
    }

optional:

    {
     	"active":true
    }

#### Update

    put : /api/agent/:id

    ex: localhost:3002/api/agent/A00100

optional:

    {
        "agentName":"Vishnu",
        "companyName":"Lanet",
        "street":"Dumas",
        "cityId":5,
        "zipCode":395001,
        "classification":"P",
        "active":true
    }

#### Delete

    delete : /api/agent/:id

    ex: localhost:3002/api/agent/A00100

#### Select

    get : /api/agent

#### Searching

    post : /api/agent

    ex: localhost:3002/api/agent

optional:

    {
        "agentId":"A00170",
        "agentName":"Wilfredo Ernser",
        "companyName":"Lindgren Inc",
        "street":"104 Wunsch Track",
        "cityId":478,
        "zipCode":69891,
        "serviceId":6
    }


### Contact:
#### Insert

    post : /api/contact

Require:

    {
    	"firstName":"Vishnu",
    	"lastName":"Mavawala",
    	"accessId":"C00100"
    }

optional:

    {
        "work":9876543210,
        "cell":9876543210,
        "email":"lanetteam.vishnu@gmail.com",
        "contactType":"Primary"
    }

#### Update

    put : /api/contact/:id

    ex: localhost:3002/api/contact/10

optional:

    {
    	"firstName":"Vishnu",
    	"lastName":"Mavawala",
    	"accessId":"C00100",
        "work":9876543210,
        "cell":9876543210,
        "email":"lanetteam.vishnu@gmail.com",
        "contactType":"Primary"
    }

#### Delete

    delete : /api/contact/:id

    ex: localhost:3002/api/contact/15

##### Select

    get : /api/contact/:id

    ex: localhost:3002/api/contact/10


### Services:
#### AllSelect

    get : /api/totservices/:type

    ex: localhost:3002/api/totservices/A

#### Select

    get : /api/services/:id

    ex: localhost:3002/api/services/C00100

#### Modify

    post : /api/services/:id

    ex: localhost:3002/api/services/A00100

Require:

    {
        "serviceId":[2, 3, 4, .. n]
    }

### Equipment:
#### AllSelect

    get : /api/totequipment

    ex: localhost:3002/api/totequipment

#### Select

    get : /api/equipment/:id

    ex: localhost:3002/api/equipment/C00120

#### Modify

    post : /api/equipment/:id

    ex: localhost:3002/api/equipment/C00200

Require:

    {
        "equipmentId":[2, 3, 4, .. n]
    }

### Carrier:
#### Insert

    post : /api/carrier

Require:

    {
        "carrierName":"Ace",
        "companyName":"Lanet",
        "street":"Dumas",
        "cityId":5,
        "zipCode":395001,
        "classification":"A"
    }

optional:

    {
        "active":true
    }

#### Update

    put : /api/carrier/:id

    ex: localhost:3002/api/carrier/C00100

optional:

    {
        "carrierName":"Ace",
        "companyName":"Lanet",
        "street":"Dumas",
        "cityId":5,
        "zipCode":395001,
        "classification":"A"
    }

#### Delete

    delete : /api/carrier/:id

    ex: localhost:3002/api/carrier/C00100

#### Select

    get : /api/carrier

#### Searching

    post : /api/carrier

    ex: localhost:3002/api/carrier

optional:

    {
        "carrierId":"C00110",
        "carrierName":"do E",
        "companyName":"Lindgren Inc",
        "street":"104 Wunsch Track",
        "cityId":478,
        "zipCode":69891,
        "classification":'A',
        "serviceId":10,
        "equipmentId":7
    }

### Attachment:
#### Select

    get : /api/attachment/:id

    ex: localhost:3002/api/attachment/A00150

#### Insert

    post : /api/attachment/:id

    ex: localhost:3002/api/attachment/A00150

Require:

    file : data...

#### Multiple Delete

    put : /api/attachment

    ex: localhost:3002/api/attachment

Require:

    [
    	{
    		"attachmentId":8
    	},
    	{
    		"attachmentId":9
    	},
    	{
    		"attachmentId":10
    	},
    	...
    ]

#### Single Delete

    delete : /api/attachment/:id

    ex: localhost:3002/api/attachment/8



### Warehouse:
#### Insert

    post : /api/warehouse

Require:

    {
        "warehouseName":"Shop",
        "street":"Bhagal",
        "cityId":500,
        "zipCode":395003,
        "agentId":"A00110"
    }

#### Select

    get : /api/warehouse

#### Update

    put : /api/warehouse/:id

    ex: localhost:3002/api/warehouse/11

optional:

    {
        "warehouseName":"Shops",
       	"street":"Bhagal",
       	"cityId":500,
       	"zipCode":395003,
       	"agentId":"A00110"
    }

#### Delete

    delete : /api/warehouse/:id

    ex: localhost:3002/api/warehouse/13