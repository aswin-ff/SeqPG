import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres", "postgres", "password", {
  hsot: "localhost",
  dialect: "postgres",
});

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("Database syncing done successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connection, User };
