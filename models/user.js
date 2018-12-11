module.exports = function(sequelize, DataTypes) {
  var userTable = sequelize.define("userTable", {
    gID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { len: [8] }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {isEmail: true}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  userTable.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    userTable.hasMany(models.postTable, {
      onDelete: "cascade"
    });
  };
  return userTable;
};
