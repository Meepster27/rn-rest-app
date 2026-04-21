const dotenv = require('dotenv');
dotenv.config();

module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
  };
};
