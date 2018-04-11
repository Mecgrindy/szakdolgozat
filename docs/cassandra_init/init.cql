create keyspace if not exists fhirdb
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

use fhirdb;

create table if not exists person (
  id uuid primary key,
  identifier varchar,
  name varchar,
  telecom varchar,
  gender text,
  birthDate date,
  address varchar,
  photo varchar,
  managingOrganization varchar,
  active boolean,
  insertdate date,
);

create table if not exists group (
  id uuid primary key,
  identifier text,
  type text,
  actual boolean,
  code varchar,
  name varchar,
  quantity smallint,
  active boolean
);

create table if not exists organization(
  id uuid primary key,
  identifier text,
  type text,
  name varchar,
  alias varchar,
  telecom varchar,
  address varchar,
  partof varchar,
  active boolean,
  endpoint varchar,
);
