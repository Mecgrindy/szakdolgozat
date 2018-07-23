create keyspace if not exists fhirdbacl
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

create keyspace if not exists fhirdbperson
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

create type if not exists period(
  start TIMESTAMP,
  end TIMESTAMP,
);

create type if not exists humanname(
  uses VARCHAR,
  text VARCHAR,
  family VARCHAR,
  given list<VARCHAR>,
  prefix list<VARCHAR>,
  suffix list<VARCHAR>,
  period frozen<period>
);

create type if not exists contactpoint(
  system VARCHAR,
  value VARCHAR,
  uses VARCHAR,
  rank INT,
  period frozen<period>
);

create type if not exists address(
  uses VARCHAR,
  type VARCHAR,
  text VARCHAR,
  line VARCHAR,
  city VARCHAR,
  district VARCHAR,
  state VARCHAR,
  postalcode VARCHAR,
  country VARCHAR,
  period frozen<period>
);

create type if not exists attachment(
  contenttype VARCHAR,
  language VARCHAR,
  data VARCHAR,
  url VARCHAR,
  size int,
  hash VARCHAR,
  title VARCHAR,
  creation TIMESTAMP,
);

create type if not exists link(
  target VARCHAR,
  assurance VARCHAR,
);

create type if not exists extension(
  url VARCHAR,
  valuestring VARCHAR,
);

create table if not exists fhirdbperson.person (
  id uuid,
  identifier list<varchar>,
  nametext varchar,
  name list<frozen<humanname>>,
  email varchar,
  telecom list<frozen<contactpoint>>,
  gender text, 
  birthdate timestamp,
  address list<frozen<address>>,
  photo frozen<attachment>,
  managingorganization varchar,
  active boolean,
  link list<frozen<link>>,
  extension list<frozen<extension>>,
  primary key((id), nametext, email, birthdate, gender)
);

create table if not exists fhirdbperson.person (
  id uuid,
  identifier VARCHAR,
  nametext varchar,
  name VARCHAR,
  email varchar,
  telecom VARCHAR,
  gender text, 
  birthdate timestamp,
  address VARCHAR,
  photo VARCHAR,
  managingorganization varchar,
  active boolean,
  link VARCHAR,
  extension VARCHAR,
  primary key((id), nametext, email, birthdate, gender)
);

create materialized view fhirdbperson.personnametextasc as
select * from fhirdbperson.person
where  active is not null and nametext is not null and email is not null and birthdate
is not null and gender is not null
primary key((active), nametext, email, birthdate, gender, id)
with clustering order by (nametext asc);

create materialized view fhirdbperson.personnametextdesc as
select * from fhirdbperson.person
where  active is not null and nametext is not null and email is not null and birthdate
is not null and gender is not null
primary key((active), nametext, email, birthdate, gender, id)
with clustering order by (nametext desc);

create materialized view fhirdbperson.personemailasc as
select * from fhirdbperson.person
where  active is not null and email is not null and nametext is not null and birthdate
is not null and gender is not null
primary key((active), email, nametext, birthdate, gender, id)
with clustering order by (email asc);

create materialized view fhirdbperson.personemaildesc as
select * from fhirdbperson.person
where  active is not null and email is not null and nametext is not null and birthdate
is not null and gender is not null
primary key((active), email, nametext, birthdate, gender, id)
with clustering order by (email desc);

create materialized view fhirdbperson.personbirthdateasc as
select * from fhirdbperson.person
where  active is not null and birthdate is not null and nametext is not null and email
is not null and gender is not null
primary key((active), birthdate, nametext, email, gender, id)
with clustering order by (birthdate asc);

create materialized view fhirdbperson.personbirthdatedesc as
select * from fhirdbperson.person
where  active is not null and birthdate is not null and nametext is not null and email
is not null and gender is not null
primary key((active), birthdate, nametext, email, gender, id)
with clustering order by (birthdate desc);

create materialized view fhirdbperson.persongenderasc as
select * from fhirdbperson.person
where  active is not null and gender is not null and nametext is not null and email
is not null and birthdate is not null
primary key((active), gender, nametext, email, birthdate, id)
with clustering order by (gender asc);

create materialized view fhirdbperson.persongenderdesc as
select * from fhirdbperson.person
where  active is not null and gender is not null and nametext is not null and email
is not null and birthdate is not null
primary key((active), gender, nametext, email, birthdate, id)
with clustering order by (gender desc);

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

create table if not exists fhirdbacl.acl(
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

create materialized view fhirdbacl.aclappnameasc as
select * from fhirdbacl.acl
where  active is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), appname, patname, resname, requestername, providername, id)
with clustering order by (appname asc);

create materialized view fhirdbacl.aclappnamedesc as
select * from fhirdbacl.acl
where active is not null and appname is not null and patname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), appname, patname, resname, requestername, providername, id)
with clustering order by (appname desc);

create materialized view fhirdbacl.aclpatnameasc as
select * from fhirdbacl.acl
where active is not null and patname is not null and appname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), patname, appname, resname, requestername, providername, id)
with clustering order by (patname asc);

create materialized view fhirdbacl.aclpatnamedesc as
select * from fhirdbacl.acl
where active is not null and patname is not null and appname is not null and resname
is not null and requestername is not null and providername is not null
primary key((active), patname, appname, resname, requestername, providername, id)
with clustering order by (patname desc);

create materialized view fhirdbacl.aclresnameasc as
select * from fhirdbacl.acl
where active is not null and resname is not null and appname is not null and patname
is not null and requestername is not null and providername is not null
primary key((active), resname, appname, patname, requestername, providername, id)
with clustering order by (resname asc);

create materialized view fhirdbacl.aclresnamedesc as
select * from fhirdbacl.acl
where active is not null and resname is not null and appname is not null and patname
is not null and requestername is not null and providername is not null
primary key((active), resname, appname, patname, requestername, providername, id)
with clustering order by (resname desc);

create materialized view fhirdbacl.aclrequesternameasc as
select * from fhirdbacl.acl
where active is not null and requestername is not null and appname is not null and patname
is not null and resname is not null and providername is not null
primary key((active), requestername, appname, patname, resname, providername, id)
with clustering order by (requestername asc);

create materialized view fhirdbacl.aclrequesternamedesc as
select * from fhirdbacl.acl
where active is not null and requestername is not null and appname is not null and patname
is not null and resname is not null and providername is not null
primary key((active), requestername, appname, patname, resname, providername, id)
with clustering order by (requestername desc);

create materialized view fhirdbacl.aclprovidernameasc as
select * from fhirdbacl.acl
where active is not null and providername is not null and appname is not null and patname
is not null and resname is not null and requestername is not null
primary key((active), providername, appname, patname, resname, requestername, id)
with clustering order by (providername asc);

create materialized view fhirdbacl.aclprovidernamedesc as
select * from fhirdbacl.acl
where active is not null and providername is not null and appname is not null and patname
is not null and resname is not null and requestername is not null
primary key((active), providername, appname, patname, resname, requestername, id)
with clustering order by (providername desc);