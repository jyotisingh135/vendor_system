'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblCustomService = sequelize.define('tblCustomService', {}, {});
  tblCustomService.associate = function(models) {
    // associations can be defined here
  };
  return tblCustomService;
};