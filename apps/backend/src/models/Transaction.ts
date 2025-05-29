import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Offer from './Offer';

interface TransactionAttributes {
  id: string;
  buyerId: string;
  offerId: string;
  transactionDate: Date;
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: string;
  public buyerId!: string;
  public offerId!: string;
  public transactionDate!: Date;
  public totalPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    offerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Offer,
        key: 'id',
      },
    },
    transactionDate: { type: DataTypes.DATE, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true,
  }
);

export default Transaction;
