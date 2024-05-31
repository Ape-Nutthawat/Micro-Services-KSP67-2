import { createPool } from 'mariadb';
import config from './config.js';

/**
 * @type { import('mariadb').Pool }
 */
export const pool = createPool(config.db.main);
