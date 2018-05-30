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
  birthDate varchar,
  address varchar,
  photo varchar,
  managingOrganization varchar,
  active boolean,
  link varchar,
  extension varchar,
  primary key (id)
);

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
  start timestamp,
  end timestamp,
  requesterid varchar,
  requestername text,
  providerid varchar,
  providername text,
  when timestamp,
  active boolean,
  primary key((id), appname, patname, resname, requestername, providername)
);

create materialized view fhirdb.aclappnameasc as
select * from fhirdb.acl
where  active is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), appname, patname, resname, requestername, providername, id)
with clustering order by (appname asc);

create materialized view fhirdb.aclappnamedesc as
select * from fhirdb.acl
where active is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), appname, patname, resname, requestername, providername, id)
with clustering order by (appname desc);

create materialized view fhirdb.aclpatnameasc as
select * from fhirdb.acl
where active is not null and patname is not null and appname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), patname, appname, resname, requestername, providername, id)
with clustering order by (patname asc);

create materialized view fhirdb.aclpatnamedesc as
select * from fhirdb.acl
where active is not null and patname is not null and appname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), patname, appname, resname, requestername, providername, id)
with clustering order by (patname desc);

create materialized view fhirdb.aclresnameasc as
select * from fhirdb.acl
where active is not null and resname is not null and appname is not null and patname
is not null and requestername is not null and providername is not null
primary key((active), resname, appname, patname, requestername, providername, id)
with clustering order by (resname asc);

create materialized view fhirdb.aclresnamedesc as
select * from fhirdb.acl
where active is not null and resname is not null and appname is not null and patname
is not null and requestername is not null and providername is not null
primary key((active), resname, appname, patname, requestername, providername, id)
with clustering order by (resname desc);

create materialized view fhirdb.aclrequesternameasc as
select * from fhirdb.acl
where active is not null and requestername is not null and appname is not null and patname
is not null and resname is not null and providername is not null
primary key((active), requestername, appname, patname, resname, providername, id)
with clustering order by (requestername asc);

create materialized view fhirdb.aclrequesternamedesc as
select * from fhirdb.acl
where active is not null and requestername is not null and appname is not null and patname
is not null and resname is not null and providername is not null
primary key((active), requestername, appname, patname, resname, providername, id)
with clustering order by (requestername desc);

create materialized view fhirdb.aclprovidernameasc as
select * from fhirdb.acl
where active is not null and providername is not null and appname is not null and patname
is not null and resname is not null and requestername is not null
primary key((active), providername, appname, patname, resname, requestername, id)
with clustering order by (providername asc);

create materialized view fhirdb.aclprovidernamedesc as
select * from fhirdb.acl
where active is not null and providername is not null and appname is not null and patname
is not null and resname is not null and requestername is not null
primary key((active), providername, appname, patname, resname, requestername, id)
with clustering order by (providername desc);