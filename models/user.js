module.exports = function (sequelize, DataTypes) {
  var userTable = sequelize.define("userTable", {
    id: {
      autoIncrement:true,
      primaryKey: true,
      type: DataTypes.INTEGER      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {
      //   len: [500]
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
      // validate: {isEmail: true}
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    }
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