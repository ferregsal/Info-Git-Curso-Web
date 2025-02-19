
CREATE DATABASE if not exists demo_users;

SET foreign_key_checks = 0;   
drop table if exists users;
SET foreign_key_checks = 1;     
  
CREATE TABLE users (
    user_id binary(16) default (uuid_to_bin(uuid())) primary key,
    user_alias VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    surname VARCHAR(100),
    phone CHAR(12) UNIQUE,
	friends INT DEFAULT 0,
    enemies INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    updated_at TIMESTAMP NOT NULL DEFAULT (NOW())
);
    

SET foreign_key_checks = 0;   
drop table if exists users_relations ;
SET foreign_key_checks = 1;

  CREATE TABLE users_relations (
    source_user_id BINARY(16) NOT NULL,
    target_user_id BINARY(16) NOT NULL,
    relation_type ENUM('friend', 'enemy'),
    created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
	updated_at TIMESTAMP NOT NULL DEFAULT (NOW()),
    PRIMARY KEY (source_user_id, target_user_id),
    FOREIGN KEY(source_user_id) REFERENCES users(user_id),
    FOREIGN KEY(target_user_id) REFERENCES users(user_id),
    CONSTRAINT check_other_id CHECK (source_user_id != target_user_id)
  );
  
-- insert into users (user_id, user_alias, email, first_name, surname, phone) values (
-- UUID_TO_BIN(@uuid), 'a', 'a', 'a', 'a', 'a'
-- );

insert into users (user_alias, email, first_name, surname, phone) values 
	('@pepe', 'pepe@sample.com', 'Pepe', 'Pérez', '687456234'),
	('@erni', 'erni@sample.com', 'Ernestina', 'Gálvez', '673874234'),
    ('@luis', 'luis@sample.com', 'Luis', 'Sánchez', '683456234'),
    ('@rosa', 'rosa@sample.com', 'Rosa', 'Moreno', '676384234'),
    ('@jon', 'jon@sample.com', 'Jon', 'Goicoechea', '697634234'),
    ('@helena', 'helena@sample.com', 'Helana', 'Lance', '687934234');
  
-- insert into user_others (source_user_id, target_user_id, relation_type ) VALUES (
-- UUID_TO_BIN(@uuid), UUID_TO_BIN(@uuid), 'enemy'
-- );

-- select BIN_TO_UUID(target_user_id), BIN_TO_UUID(source_user_id), relation_type from user_others;

-- select u.first_name as nombre, u.surname as apellidos, n.title as titulo 
-- from users u join notes n on u.user_id = n.author_id;
