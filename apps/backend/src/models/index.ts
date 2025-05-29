import User from './User';
import Offer from './Offer';
import Transaction from './Transaction';

User.hasMany(Offer, { foreignKey: 'sellerId', as: 'offers' });
Offer.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });

User.hasMany(Transaction, { foreignKey: 'buyerId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });

Offer.hasOne(Transaction, { foreignKey: 'offerId', as: 'transaction' });
Transaction.belongsTo(Offer, { foreignKey: 'offerId', as: 'offer' });

export { User, Offer, Transaction };
