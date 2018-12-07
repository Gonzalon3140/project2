module.exports = function(sequelize, DataTypes) {
  var commentTable = sequelize.define("commentTable", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [500]
      }
    }
  });
  commentTable.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    commentTable.belongsTo(models.postTable, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  commentTable.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    commentTable.belongsTo(models.userTable, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return commentTable;
};
