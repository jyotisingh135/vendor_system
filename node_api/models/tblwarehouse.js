'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblWarehouse = sequelize.define('tblWarehouse', {}, {});
  tblWarehouse.associate = function(models) {
    // associations can be defined here
  };
  return tblWarehouse;
};