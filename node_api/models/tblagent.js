'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblAgent = sequelize.define('tblAgent', {}, {});
  tblAgent.associate = function(models) {
    // associations can be defined here
  };
  return tblAgent;
};