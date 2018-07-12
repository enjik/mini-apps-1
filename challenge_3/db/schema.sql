DROP DATABASE IF EXISTS users;

CREATE DATABASE users;
USE users;

CREATE TABLE checkout (
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  email VARCHAR(50),
  password VARCHAR(20),
  line1 VARCHAR(50),
  city VARCHAR(20),
  state VARCHAR(20),
  zip VARCHAR(6),
  phone VARCHAR(20),
  creditCard VARCHAR(20),
  expiryMonth SMALLINT(2),
  expiryYear SMALLINT(4),
  cvv SMALLINT(4),
  billingZip VARCHAR(6),
  PRIMARY KEY(id)
);
INSERT INTO checkout
(firstName, lastName, email, password, line1, city, state, zip, phone, creditCard, expiryMonth, expiryYear, cvv, billingZip)
VALUES ('Enji', 'Kim', 'enjikim@live.com', 'mikijne', '4669 E. Rose Garden Lane', 'Scottsdale', 'AZ', 85255, '480-555-5119', '8801015563954744', 1, 19, 471, '85255');
SELECT * FROM checkout;
