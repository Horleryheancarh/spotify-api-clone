import 'dotenv/config';

export const PORT: number = parseInt(process.env.PORT);
export const DB_PORT: number = parseInt(process.env.DB_PORT);

export const { DB_HOST, DB_USERNAME, DB_PASSWORD, JWT_SECRET } = process.env;
