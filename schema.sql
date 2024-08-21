CREATE TABLE user(
    id VARCHAR(60) PRIMARY KEY,
    username VARCHAR(60) UNIQUE,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL
);

DESCRIBE user;

INSERT INTO user(id,username,email,password) VALUES
("101","u101","u@gmail.com","u@123.");

SELECT * FROM user;

DROP TABLE user;

UPDATE user SET username = 'hello' WHERE id = '101';

 