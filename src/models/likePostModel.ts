import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/utils/sequelize';

interface LikePostAttributes {
  id: number;
  like: number;
  userId?: number;
  postId?: number;
}
interface LikePostCreationAttributes
  extends Optional<LikePostAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface LikePostInstance
  extends Model<LikePostAttributes, LikePostCreationAttributes>,
    LikePostAttributes {}

const LikePost = sequelize.define<LikePostInstance>('like_posts', {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  like: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

export default LikePost;
