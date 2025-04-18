const port = process.env.PORT_SERVER || 3010;

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: port,
  username: 'check-in-car',
  password: 'postgres',
  database: 'check-in-car',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
