import { User } from './models/index.js';

const force = false;
const alter = process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'test';
const options = { alter, force };

const dbInit = () => Promise.all([User.sync(options)]);

export default dbInit;
