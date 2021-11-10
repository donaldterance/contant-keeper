module.exports = {
  config: {
    mongoURI: process.env.DATABASE_URL,
    jwtSecret: 'secret',
  },
};
