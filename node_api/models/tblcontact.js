'use strict';
module.exports = (sequelize, DataTypes) => {
    var tblContact = sequelize.define('tblContact', {
          primaryKey: DataTypes.TRUE,
          autoIncrement: DataTypes.TRUE
        }, allowNull: DataTypes.FALSE
      },
      allowNull: DataTypes.FALSE
  },
  allowNull: DataTypes.FALSE
},
allowNull: DataTypes.FALSE
},
allowNull: DataTypes.FALSE
},
allowNull: DataTypes.TRUE
},
allowNull: DataTypes.FALSE
},
allowNull: DataTypes.TRUE
},
allowNull: DataTypes.FALSE
},
allowNull: DataTypes.FALSE,
  defaultValue: DataTypes.FALSE
}
}
}, {});
tblContact.associate = function(models) {
  // associations can be defined here
};
return tblContact;
};