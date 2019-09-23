const connection = require('../config/connection');

const addUser = ({
  username,
  email,
  phone,
  password,
  city,
  isHandyman,
}) => {
  const sql = {
    text: 'INSERT INTO users (username,email,phone,password,country,city,is_handyman) VALUES ($1,$2,$3,$4,$5,$6,$7) returning id;',
    values: [
      username,
      email,
      phone,
      password,
      city,
      isHandyman,
    ],
  };
  return connection.query(sql);
};

module.exports = addUser;