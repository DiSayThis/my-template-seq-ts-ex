import User from './user.js';
import Menu from './menu.js';
import Division from './divisions.js';
import EnumProduct from './enumProduct.js';
import Product from './product.js';
import Order from './order.js';
import Executor from './executor.js';

EnumProduct.belongsTo(EnumProduct, { as: 'Parent', foreignKey: 'parentId' });
EnumProduct.hasMany(EnumProduct, { as: 'Child', foreignKey: 'parentId' });

EnumProduct.hasMany(Product);
Product.belongsTo(EnumProduct);

Executor.hasMany(Product);
Product.belongsTo(Executor);

Order.hasMany(Product);
Product.belongsTo(Order);

Division.hasMany(Product);
Product.belongsTo(Division);

Division.hasMany(Order);
Order.belongsTo(Division);

Division.hasMany(User);
User.belongsTo(Division);

export { User, Menu, Division, EnumProduct, Product, Order, Executor };

export interface ICountOutput<T> {
	rows: T[];
	count: number;
}
