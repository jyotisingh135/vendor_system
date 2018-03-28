'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblAgentProject = sequelize.define('tblAgentProject', {}, {});
  tblAgentProject.associate = function(models) {
    // associations can be defined here
  };
  return tblAgentProject;
};