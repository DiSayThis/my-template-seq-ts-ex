import User from './user.js';
import Menu from './menu.js';
import Division from './divisions.js';
import EnumProduct from './enumProduct.js';
import Product from './product.js';
import Order from './order.js';
import Executor from './executor.js';

Division.hasMany(Order);

EnumProduct.hasMany(EnumProduct, { as: 'Children', foreignKey: 'parentId' });
EnumProduct.hasMany(Product);
Executor.hasMany(Product);
Order.hasMany(Product);
Order.belongsTo(Division);

Product.belongsTo(EnumProduct);
Product.belongsTo(Order);
Product.belongsTo(Executor);
export { User, Menu, Division, EnumProduct, Product, Order, Executor };

export interface ICountOutput<T> {
	rows: T[];
	count: number;
}
