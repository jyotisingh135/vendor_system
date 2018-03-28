'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblService = sequelize.define('tblService', {}, {});
  tblService.associate = function(models) {
    // associations can be defined here
  };
  return tblService;
};