import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/utils/sequelize';

interface ReportCommentAttributes {
  id: number;
  subject: string;
}

interface ReportCommentCreationAttributes
  extends Optional<ReportCommentAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface ReportCommentInstance
  extends Model<ReportCommentAttributes, ReportCommentCreationAttributes>,
    ReportCommentAttributes {}

const ReportComment = sequelize.define<ReportCommentInstance>(
  'reports_comments',
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

export default ReportComment;
