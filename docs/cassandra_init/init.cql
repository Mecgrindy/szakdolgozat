create keyspace if not exists fhirdb
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

create table if not exists fhirdb.person (
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

create table if not exists fhirdb.group (
  id uuid,
  identifier text,
  type text,
  actual boolean,
  code varchar,
  name varchar,
  quantity smallint,
  active boolean,
  primary key (id)
);

create table if not exists fhirdb.organization(
  id uuid,
  identifier text,
  type text,
  name varchar,
  alias varchar,
  telecom varchar,
  address varchar,
  partof varchar,
  active boolean,
  endpoint varchar,
  primary key (id)
);

create table if not exists fhirdb.acl(
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
  active boolean,
  primary key((id), appname, patname, resname, requestername, providername)
);

create materialized view fhirdb.aclappnameasc as
select id, appname, patname, resname, requestername, providername from fhirdb.acl
where appid is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((appid), appname, patname, resname, requestername, providername, id)
with clustering order by (appname asc);

create materialized view fhirdb.aclappnamedesc as
select id, appname, patname, resname, requestername, providername from fhirdb.acl
where appid is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((appid), appname, patname, resname, requestername, providername, id)
with clustering order by (appname desc);