'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblProject = sequelize.define('tblProject', {}, {});
  tblProject.associate = function(models) {
    // associations can be defined here
  };
  return tblProject;
};