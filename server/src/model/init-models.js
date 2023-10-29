import _sequelize, { Sequelize } from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _posts from './posts.js';
import _users from './users.js';

const sequelize = new Sequelize(
  process.env.DB_NM,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function initModels(sequelize) {
  const posts = _posts.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  posts.belongsTo(users, { as: 'user', foreignKey: 'user_id' });
  users.hasMany(posts, { as: 'posts', foreignKey: 'user_id' });

  return {
    posts,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };
