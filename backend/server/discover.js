var app = require('./server');
var dataSource = app.dataSources["fhir-cassandra"];

dataSource.discoverSchema('person', {
  owner: 'fhirdb'
}, function(err, schema) {
  console.log(JSON.stringify(schema, null, '  '));
});