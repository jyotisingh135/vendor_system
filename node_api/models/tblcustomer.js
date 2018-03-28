'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblCustomer = sequelize.define('tblCustomer', {}, {});
  tblCustomer.associate = function(models) {
    // associations can be defined here
  };
  return tblCustomer;
};