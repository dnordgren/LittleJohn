drop table if exists users;
drop table if exists lists;
drop table if exists securities;

create table users (
  id serial primary key,
  email varchar(128) not null,
  first_name varchar(128),
  last_name varchar(128),
  api_key varchar(128) not null unique,
  created_at timestamp not null default current_timestamp
);

create table lists (
  id serial primary key,
  title varchar(255) not null,
  description text,
  portfolio_type varchar(30) not null default 'investment'
    check (portfolio_type in ('investment', 'speculative', 'cryptocurrency', 'mixed')),
  created_at timestamp not null default current_timestamp,
  owner_id integer references users not null
);

create table securities (
  id serial primary key,
  symbol varchar(128) not null,
  target_ratio decimal,
  notes text,
  added_at timestamp not null default current_timestamp,
  added_by integer references users not null,
  added_to integer references lists not null,
  constraint security_unique_per_list
    unique(symbol, added_to)
);

INSERT INTO "users" ("email","first_name","last_name","api_key")
VALUES
(E'derek.nordgren@protonmail.com',E'Derek',E'Nordgren',E'1234');

INSERT INTO "lists" ("title","description","portfolio_type","owner_id")
VALUES
(E'Robinhood',E'Securities in Robinhood portfolio',E'mixed',1),
(E'401k',E'Securities in 401k',E'investment',1);

INSERT INTO "securities" ("symbol","target_ratio","notes","added_by","added_to")
VALUES
(E'MMM',0.10,E'Strong dividend stock',1,1),
(E'FCNTX',0.50,E'High-growth',1,2);
