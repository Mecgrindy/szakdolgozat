'use strict';

module.exports = function (Person) {
  Person.byView = function (viewname, cb) {
    var ds = Person.dataSource;
    if (viewname === undefined)
      viewname = 'person';
    var sql = 'SELECT * FROM ' + viewname;
    ds.connector.query(sql, [], function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, sqlResp);
    });
  };
  Person.remoteMethod('byView', {
    http: { path: '/', verb: 'get' },
    description: 'Get list of personview',
    accepts: [
      { arg: 'viewname', type: 'string' },
    ],
    returns: { arg: 'data', type: ['person'], root: true }
  });

  Person.getById = function (id, cb) {
    var ds = Person.dataSource;
    var sql = 'SELECT * FROM person WHERE id=?';

    ds.connector.query(sql, [id], function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, sqlResp);
    });
  };
  Person.remoteMethod('getById', {
    http: { path: '/:id', verb: 'get', required: true },
    description: 'Get person by id',
    accepts: { arg: 'id', type: 'string' },
    returns: { arg: 'data', type: 'person', root: true }
  });

  Person.deleteById = function (id, cb) {
    var ds = Person.dataSource;
    var sql = 'DELETE FROM person'
      + 'WHERE id=? IF EXISTS';
    ds.connector.query(sql, [id], function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, "Success");
    });
  };
  Person.remoteMethod('deleteById', {
    http: { path: '/:id', verb: 'delete' },
    description: 'Delete person by id',
    accepts: { arg: 'id', type: 'string', required: true },
    returns: { arg: 'message', type: 'string', root: true }
  });

  /*Person.insertOne = function (person, cb) {
    var ds = Person.dataSource;
    var columns = '', values = '', params = [];
    for (var k in person) {
      if (person.hasOwnProperty(k)) {
        columns += "," + k;
        values += ",?";
        params.push(person[k]);
      }
    }
    var sql = "INSERT INTO person (id" + columns + ") "
      + "VALUES(uuid()" + values + ");";

    ds.connector.query(sql, params, function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, sqlResp);
    });
  };
  Person.remoteMethod('insertOne', {
    http: { path: '/', verb: 'post' },
    description: 'Insert one person',
    accepts: { arg: 'data', type: 'object' },
    returns: { arg: 'data', type: 'person', root: true }
  });*/

  /*Person.createPerson = function (personData, callback) {
    var db = Person.app.dataSources['fhir-cassandra'].connector;
    db.create('person', personData, {}, function (err, data) {
      if (err) console.error(err);
      callback(err, data);
    });
  };
  Person.remoteMethod('createPerson', {
    accepts: [{ arg: 'personData', type: 'Object', http: { source: 'body' } }],
    returns: [{ type: 'person', arg: 'data', root: true }],
    http: { verb: 'post', path: '/' },
    description: 'Create one person'
  });*/
};


