const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    db: {
      host: "sql7.freesqldatabase.com",
      user: "sql7719656",
      password: "Gk7mVbZglA",
      database: "sql7719656",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
          return queryTestDb(query, config);
        },
      });
    },
  },
});

const mysql = require("mysql");

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}
