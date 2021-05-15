import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/utils/sequelize';
import Comment from './commentModel';
import LikePost from './likePostModel';
import ReportPost from './reportPostModel';

interface PostAttributes {
  id: number;
  title: string;
  content: JSON;
  description: string;
  slug: string;
  image: Array<string>;
  promoted: boolean;
  vip: boolean;
  read_time: number;
  local: string;
  postsCategoryId?: number;
  userId?: number;
}
interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface PostInstance
  extends Model<PostAttributes, PostCreationAttributes>,
    PostAttributes {}

const Post = sequelize.define<PostInstance>('posts', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.JSONB,
  },
  description: {
    type: DataTypes.TEXT,
  },
  slug: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  promoted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  vip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  read_time: {
    type: DataTypes.INTEGER,
  },
  local: {
    type: DataTypes.TEXT,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

Post.hasMany(Comment, {
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  constraints: false,
});

Post.hasMany(LikePost, {
  onDelete: 'CASCADE',
});
LikePost.belongsTo(Post, {
  constraints: false,
});

Post.hasMany(ReportPost, {
  onDelete: 'CASCADE',
});

ReportPost.belongsTo(Post, {
  constraints: false,
});

export default Post;
