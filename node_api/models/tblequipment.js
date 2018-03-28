'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblEquipment = sequelize.define('tblEquipment', {}, {});
  tblEquipment.associate = function(models) {
    // associations can be defined here
  };
  return tblEquipment;
};