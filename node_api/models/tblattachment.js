'use strict';
module.exports = (sequelize, DataTypes) => {
  var tblAttachment = sequelize.define('tblAttachment', {}, {});
  tblAttachment.associate = function(models) {
    // associations can be defined here
  };
  return tblAttachment;
};