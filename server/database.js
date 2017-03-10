"use strict";

// Database Module
(function() {

  var sqlite3 = require('sqlite3').verbose();

  /**
   * Check we can connect to the database
   * ':memory:' in memory DB or data.db TODO change to memory?
   */
  var db = new sqlite3.Database('data.db', function(err, open) {
    if (err) {
      throw new Error('Database failed to connect!');
    } else {
      console.log('SQLite3 successfully connected.');
    }
  });

  /**
   * Initialise the database
   */
  db.run("create table if not exists clicks (id INTEGER PRIMARY KEY AUTOINCREMENT, number)", function(err) {
    if(err) {
        throw new Error('Database failed to be created!');
    } else {
      console.log('successfully created table clicks.');
    }
    console.log("createTableClicks inserting click 0");
    db.run("insert into clicks (number) values (0)");
  });


  function createTableClicks(db) {
    console.log("createTable clicks");
    db.run("create table if not exists clicks (number)", function(err) {
      console.log("createTableClicks inserting click 0");
      db.run("insert into clicks values (0)");
    }); // TODO change to int
  }

  function ClickHandler (db) {
    this.getClicks = function (req, res) {
      // createTableClicks(db, "clicks");
      db.each("select * from clicks", function(err, row) {
          if (err) {
            throw err;
          }
          var results = [];
          results.push(row);
          res.json(results);
      });
    };
  }

  module.exports = {
    database: db
  };
}());
