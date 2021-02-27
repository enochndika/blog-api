import sequelize from '@/utils/sequelize';
import Post from './postModel';
import Comment from './commentModel';
import ChildComment from './childCommentModel';
import ReportPost from './reportPostModel';
import ReportComment from './reportComment';
import ReportChildComment from './reportChildComment';
import LikePost from './likePostModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DataTypes, Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  fullName: string;
  role: string;
  avatar: Array<string>;
  last_logged: any;
  karma: string;
}
// Some fields are optional when calling UserModel.create() or UserModel.build()
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const User = sequelize.define<UserInstance>('users', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('author', 'king'),
    defaultValue: 'author',
  },
  avatar: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  karma: {
    type: DataTypes.ENUM('0', '1', '2', '3', '4'),
    defaultValue: '0',
  },
  last_logged: {
    type: DataTypes.DATE(),
    defaultValue: Date.now(),
  },
});

//hooks
User.beforeSave(async function (user) {
  if (!user.changed('password')) return;
  const salt = await bcrypt.genSalt(10); //whatever number you want
  user.password = await bcrypt.hash(user.password, salt);
});

// methods
User.prototype.isValidPassword = function (password: typeof User) {
  return bcrypt.compareSync(password, this.password);
};

User.prototype.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  const payload = {
    username: this.username,
    role: this.role,
  };

  return jwt.sign(payload, (process.env.JWT_SECRET = 'JWT_SECRET'), {
    expiresIn: parseInt(String(expirationDate.getTime() / 1000), 10),
  });
};

User.hasMany(Post, {
  onDelete: 'CASCADE',
  as: 'author',
});

Post.belongsTo(User, {
  constraints: false,
});

User.hasMany(Comment, {
  onDelete: 'CASCADE',
});
Comment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ChildComment, {
  onDelete: 'CASCADE',
});
ChildComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(LikePost, {
  onDelete: 'CASCADE',
});

LikePost.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportComment, {
  onDelete: 'CASCADE',
});

ReportComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportChildComment, {
  onDelete: 'CASCADE',
});
ReportChildComment.belongsTo(User, {
  constraints: false,
});

User.hasMany(ReportPost, {
  onDelete: 'CASCADE',
});

ReportPost.belongsTo(User, {
  constraints: false,
});

export default User;
