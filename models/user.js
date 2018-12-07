module.exports = function(sequelize, DataTypes) {
  var userTable = sequelize.define("userTable", {
    gID: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [8]}
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {isEmail: true}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  return userTable;
};

