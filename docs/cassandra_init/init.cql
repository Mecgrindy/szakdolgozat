create keyspace if not exists fhirdb
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

use fhirdb;

create table if not exists person (
  id uuid,
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
  primary key (id, name, insertdate)
) with clustering order by (name asc, insertdate desc);

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

create table if not exists acl(
  id uuid,
  appid varchar,
  appname text,
  patid varchar,
  patname text,
  resid varchar,
  resname text,
  accesslevel tinyint,
  start date,
  end date,
  requesterid varchar,
  requestername text,
  providerid varchar,
  providername text,
  when date,
  primary key(id, appname)
) with clustering order by (appname asc);

create index if not exists on acl (appname);
create index if not exists on acl (patname);
create index if not exists on acl (resname);
create index if not exists on acl (requestername);
create index if not exists on acl (providername);
