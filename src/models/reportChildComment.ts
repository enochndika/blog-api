import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from '../utils/sequelize';

interface ReportChildCommentAttributes {
  id: number;
  subject: string;
}

interface ReportChildCommentCreationAttributes
  extends Optional<ReportChildCommentAttributes, 'id'> {}

interface ReportChildCommentInstance
  extends Model<
      ReportChildCommentAttributes,
      ReportChildCommentCreationAttributes
    >,
    ReportChildCommentAttributes {}

const ReportChildComment = sequelize.define<ReportChildCommentInstance>(
  'reports_child_comments',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    subject: {
      type: DataTypes.TEXT,
    },
  },
);

(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log(e);
  }
})();

export default ReportChildComment;
