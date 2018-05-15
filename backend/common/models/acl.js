'use strict';

module.exports = function (Acl) {

  Acl.byView = function (viewname, active, appname, patname, resname, requestername, providername, start, end, when, expired, whenadj, cb) {
    var ds = Acl.dataSource;
    var paramnames = ['viewname', 'active', 'appname', 'patname', 'resname', 'requestername', 'providername', 'start', 'end', 'when', 'expired', 'whenadj', 'cb']
    var params = [];
    var where = '', allfill = '', extraQuery = '', expString = '';
    var firstTime = true;

    var getQueryParam = function (arg, argname) {
      if (arg) {
        var queryParam = '';
        var sign = '=? ';
        if (argname === 'start' || (argname === 'when' && whenadj === 'after'))
          sign = '>=? ';
        if (argname === 'end' || (argname === 'when' && whenadj === 'before'))
          sign = '<=? ';
        queryParam = ' and ' + argname + sign;
        if (firstTime) {
          queryParam = argname + sign;
          firstTime = false;
        }
      }
      return queryParam;
    }

    if (viewname === undefined)
      viewname = 'acl';
    for (var i in arguments) {
      if (arguments[i] && i > 0 && i < arguments.length - 3) {
        params.push(arguments[i]);
        extraQuery += getQueryParam(arguments[i], paramnames[i]);
      }
    }
    if (params.length > 0 || expired === true) {
      where = ' WHERE ';
      allfill = ' allow filtering;';
    }
    if (expired === true) {
      if (params.length >= 1)
        expString += ' and ';
      expString += 'end>=\'' + +new Date() + '\'';
    }

    var sql = 'SELECT * FROM ' + viewname + where + extraQuery + expString + allfill;

    ds.connector.query(sql, params, function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, sqlResp);
    });
  };

  Acl.getById = function (id, cb) {
    var ds = Acl.dataSource;
    var sql = 'SELECT * FROM acl WHERE id=?';

    ds.connector.query(sql, [id], function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, sqlResp);
    });
  };

  Acl.deleteById = function (id, cb) {
    var ds = Acl.dataSource;
    var sql = 'DELETE FROM acl'
      + 'WHERE id=? IF EXISTS';

    ds.connector.query(sql, [id], function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, "Success");
    });
  };

  Acl.insertOne = function (acl, cb) {
    var ds = Acl.dataSource;
    var columns = '', values = '', params = [];
    for (var k in acl) {
      if (acl.hasOwnProperty(k)) {
        columns += "," + k;
        values += ",?";
        params.push(acl[k]);
      }
    }
    var sql = "INSERT INTO acl (id" + columns + ") "
      + "VALUES(uuid()" + values + ");";

    ds.connector.query(sql, params, function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, acl);
    });
  };

  Acl.updateOne = function (acl, cb) {
    var ds = Acl.dataSource;
    var columns = '', firsTime = true, firstId = true, ids = '', params = [], ids = [], idnames = ['id', 'appname', 'patname', 'resname', 'requestername', 'providername'];
    for (var k in acl) {
      if (acl.hasOwnProperty(k)) {
        if (idnames.indexOf(k) >= 0) {
          if (!firstId)
            ids += " and ";
          ids += k + "=";
          if (k != 'id')
            ids += "\'" + acl[k] + "\'";
          else ids += acl[k];
          firstId = false;
        }
        else {
          if (!firsTime)
            columns += ", ";
          columns += k + "=?";
          params.push(acl[k]);
          firsTime = false;
        }
      }
    }
    var sql = "UPDATE acl set " + columns + " WHERE " + ids;

    ds.connector.query(sql, params, function (err, sqlResp) {
      if (err) console.error(err);
      cb(err, acl);
    });
  };

  Acl.remoteMethod('byView', {
    http: { path: '/', verb: 'get' },
    description: 'Get list of aclview',
    accepts: [
      { arg: 'viewname', type: 'string' },
      { arg: 'active', type: 'boolean' },
      { arg: 'appname', type: 'string' },
      { arg: 'patname', type: 'string' },
      { arg: 'resname', type: 'string' },
      { arg: 'requestername', type: 'string' },
      { arg: 'providername', type: 'string' },
      { arg: 'start', type: 'string' },
      { arg: 'end', type: 'string' },
      { arg: 'when', type: 'string' },
      { arg: 'expired', type: 'boolean' },
      { arg: 'whenadj', type: 'string' },
    ],
    returns: { arg: 'data', type: ['acl'], root: true }
  });

  Acl.remoteMethod('getById', {
    http: { path: '/:id', verb: 'get', required: true },
    description: 'Get acl row by id',
    accepts: { arg: 'id', type: 'string' },
    returns: { arg: 'data', type: 'acl', root: true }
  });

  Acl.remoteMethod('deleteById', {
    http: { path: '/:id', verb: 'delete' },
    description: 'Delete acl row by id',
    accepts: { arg: 'id', type: 'string', required: true },
    returns: { arg: 'message', type: 'string', root: true }
  });

  Acl.remoteMethod('insertOne', {
    http: { path: '/', verb: 'post' },
    description: 'Insert one acl row',
    accepts: { arg: 'data', type: 'object' },
    returns: { arg: 'data', type: 'acl', root: true }
  });

  Acl.remoteMethod('updateOne', {
    http: { path: '/updateOne', verb: 'post' },
    description: 'Update one acl row',
    accepts: { arg: 'data', type: 'object' },
    returns: { arg: 'data', type: 'acl', root: true }
  });

};
