import { createPool } from 'mariadb';
import config from './config.js';

const pool = createPool(config.db);

export default pool;