# Installation

## Frontend
Now, Change Directory for `React Project`:

    cd ..
    cd frontend

The easiest way to install `node_modules` is through `npm` in `frontend`:

    npm install
    npm start

## API
Change Directory for `Node Project`:

    cd node_api

The easiest way to install `node_modules` is through `npm` in `node_api`:

    npm install
    npm start


## Migration:

In Ubuntu :

    node_modules/.bin/sequelize db:migrate

    node config/AddAllData.js

In Windows :

    node_modules\.bin\sequelize db:migrate

    node config\AddAllData.js
