const port = process.env.PORT_BANCO || 3010;

module.exports = {
  dialect: 'postgres',
  host: 'redblackspy.ddns.net',
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
