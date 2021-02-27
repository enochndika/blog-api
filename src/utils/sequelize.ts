import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  (process.env.DATABASE = 'DATABASE'),
  (process.env.DB_USERNAME = 'DB_USERNAME'),
  (process.env.DB_PASSWORD = 'DB_PASSWORD'),
  {
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
      freezeTableName: true,
    },
  },
);

export default sequelize;
