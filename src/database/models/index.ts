import User from './user.js';
import Menu from './menu.js';
import Division from './divisions.js';
import EnumProduct from './enumProduct.js';
import Product from './product.js';
import Order from './order.js';
import Executor from './executor.js';

Division.hasMany(User);
User.belongsTo(Division);

export { User, Menu, Division, EnumProduct, Product, Order, Executor };
