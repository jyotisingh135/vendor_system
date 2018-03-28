'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblCarrier = sequelize.define('tblCarrier', {}, {});
  tblCarrier.associate = function(models) {
    // associations can be defined here
  };
  return tblCarrier;
};