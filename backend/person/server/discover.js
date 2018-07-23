var app = require('./server');
var dataSource = app.dataSources["person-cassandra"];

dataSource.discoverSchema('person', {
  owner: 'person-cassandra'
}, function(err, schema) {
  console.log(JSON.stringify(schema, null, '  '));
});