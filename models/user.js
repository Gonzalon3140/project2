module.exports = function(sequelize, DataTypes) {
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
    }
  });
  return userTable;
};

//name email password
