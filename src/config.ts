export default () => ({
  PORT: parseInt(process.env.PORT),
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
});
