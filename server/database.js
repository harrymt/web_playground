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
      console.log('Successfully connect to the database.');
    }
  });

  /**
   * Initialise the database
   */
  db.run("create table if not exists hits (number, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)",
    function(err) {
      if(err) {
          throw new Error('Database failed to be created!');
      } else {
        console.log('Successfully created table hits.');
      }
      db.run("insert into hits (number) values (1)");
    }
  );

  var recordHit = function (req, res) {
    db.run("insert into hits (number) values (1)", function(err) {
      if (err) { throw err; res.json(err); }
      res.json(true);
    });
  }

  var getHits = function (req, res) {
    db.all("select * from hits", function(err, rows) {
        if (err) { throw err; }
        res.json(rows.length); // Sum of hits
    });
  };

  module.exports = {
    database: db,
    hits: getHits,
    trackHit: recordHit
  };
}());
