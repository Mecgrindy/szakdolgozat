# Szakdolgozat - Kokrehel Grácián

## Nodejs
https://nodejs.org/en/

## npm
https://www.npmjs.com/get-npm

## Frontend
### Prerequisite

- Angular CLI

Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.

 npm install -g @angular/cli

- Angular Material

### Starting

 cd frontend/fhir-desktop
 ng serve
 npm install (first time)
 
in browser -> http://localhost:4300

## Backend
### Cassandra

- Download

http://cassandra.apache.org/download/

- Install

On Windows might help: https://www.youtube.com/watch?time_continue=42&v=Mn1xOHAH_dc

- Start

open console or terminal:

 cassandra
 cqlsh

create keyspace with 'fhirdb' name

copy the docs/cassandra_init/person.txt and paste into cqlsh

### Loopback

- Start

 cd backend
 node .
 npm install(frist time)

run in browser -> http://localhost:3000/explorer/

post some data from docs\loopback_init


