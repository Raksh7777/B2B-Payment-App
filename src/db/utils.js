const DB = require("./pg");

const Client = DB.client();

function Query(query) {
  return new Promise((resolve, reject) => {
    Client.query(query)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
} //TODO better error messages

module.exports = { Query };
