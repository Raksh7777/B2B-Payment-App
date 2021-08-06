// Tobe Removed

const { Client } = require("pg");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};

const helper = {};
let client = null;

/**
 *Create connection with postgresql DB and return object to access db
 *
 * @returns object
 */
helper.init = () =>
  new Promise((resolve, reject) => {
    // TODO
    client = new Client(dbConfig); // change here to pool on high no of connections
    try {
      client.connect();
      resolve(client);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("failed to connect to client", error);
      reject(error);
    }
  });

// unhandle promise
helper.init();
/**
 *Get postgresql object to access db
 *
 * @returns object
 */
helper.client = () => client;

module.exports = helper;
