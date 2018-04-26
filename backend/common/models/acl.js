'use strict';

module.exports = function (Acl) {

  Acl.byView = function (viewname, active, appname, patname, resname, requestername, providername, start, end, when, expired, whenadj, cb) {

    var ds = Acl.dataSource;
    var paramnames = ['viewname', 'active', 'appname', 'patname', 'resname', 'requestername', 'providername', 'start', 'end', 'when', 'expired', 'whenadj', 'cb']
    var params = [];
    var where = '', allfill = '', and = '', extraQuery = '', expString = '';
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
      expString = 'end>=\'' + +new Date() + '\'';
    }

    var sql = 'SELECT * FROM ' + viewname + where + extraQuery + expString + allfill;

    ds.connector.query(sql, params, function (err, acls) {
      if (err) console.error(err);
      cb(err, acls);
    });
  };
  Acl.remoteMethod(
    'byView',
    {
      http: { verb: 'get' },
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
    }
  );

};
