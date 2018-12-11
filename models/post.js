module.exports = function (sequelize, DataTypes) {
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
      allowNull: true,

    },
    expirationDate: {
      type: DataTypes.STRING,
      allowNull: true,

      validate: {
        isDate: true
      }

    }
  });

  postTable.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    postTable.belongsTo(models.userTable, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return postTable;
};


// this allows us to create a created date for our table

// var user = sequelize.define('user', {
//   createdAt: {
//     type: DataTypes.DATE,
//     field: 'beginTime',
//     defaultValue: sequelize.literal('NOW()')
//   }
// }, {
//   timestamps: true,

// });