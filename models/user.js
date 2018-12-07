module.exports = function (sequelize, DataTypes) {
  var userTable = sequelize.define("userTable", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
  });

  userTable.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    userTable.hasMany(models.postTable, {
      onDelete: "cascade"
    });
  };
  return userTable;
};

//name email password