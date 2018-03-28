'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblCustomEquipment = sequelize.define('tblCustomEquipment', {}, {});
  tblCustomEquipment.associate = function(models) {
    // associations can be defined here
  };
  return tblCustomEquipment;
};