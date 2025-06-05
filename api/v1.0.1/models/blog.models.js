module.exports = (sequelize, Sequelize) => {
    const blog = sequelize.define(
      "blog",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      { timestamps: true, freezeTableName: true }
    );
    return blog;
  };
  