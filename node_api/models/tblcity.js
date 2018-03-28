'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblCity = sequelize.define('tblCity', {}, {});
  tblCity.associate = function(models) {
    // associations can be defined here
  };
  return tblCity;
};