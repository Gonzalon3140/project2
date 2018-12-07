module.exports = function(sequelize, DataTypes) {
  var postTable = sequelize.define("postTable", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [500]
      }
    },
    category: {
      type: DataTypes.STRING
    },
    expired: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true // only allow date strings
      }
    }
  });

  postTable.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    postTable.belongsTo(models.userTable, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return postTable;
};
