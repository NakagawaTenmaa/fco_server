CREATE DATABASE fco;
use fco;

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(64) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    status BOOLEAN(1),
    character_name(32) NOT NULL,
    PRIMARY KEY (id)
);