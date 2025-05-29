import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

interface OfferAttributes {
  id: string;
  sellerId: string;
  quantity: number;
  pricePerKwh: number;
  startDate: Date;
  endDate: Date;
  isSold: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OfferCreationAttributes extends Optional<OfferAttributes, 'id' | 'isSold'> {}

class Offer extends Model<OfferAttributes, OfferCreationAttributes> implements OfferAttributes {
  public id!: string;
  public sellerId!: string;
  public quantity!: number;
  public pricePerKwh!: number;
  public startDate!: Date;
  public endDate!: Date;
  public isSold!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Offer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    quantity: { type: DataTypes.FLOAT, allowNull: false },
    pricePerKwh: { type: DataTypes.FLOAT, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    isSold: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'offers',
    timestamps: true,
  }
);

export default Offer;