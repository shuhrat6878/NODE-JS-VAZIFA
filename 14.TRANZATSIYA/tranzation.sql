CREATE DATABASE Translatsiya,

use Translatsiya;


create table accounts(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(55),
    balance DECIMAL(10,2)
);


INSERT INTO accounts(
    name ,
    balance)
VALUES
    ('Ali', 1000),
    ('Vali', 500);



ALTER TABLE accounts MODIFY balance DECIMAL(10,2) UNSIGNED;


ALTER TABLE accounts MODIFY balance DECIMAL(10,2);
DESC accounts;



--1 
START TRANSACTION; UPDATE accounts  SET balance = balance -300 WHERE name = 'Ali' AND balance >=300; UPDATE accounts SET balance = balance +300 WHERE name ='Vali';COMMIT;

SELECT * FROM accounts;


---2
START TRANSACTION; UPDATE accounts SET balance = balance - 5000 WHERE name ='Ali'; COMMIT;
SELECT * FROM accounts;


--3.1

START TRANSACTION; UPDATE accounts SET balance = balance +3000 WHERE name = 'Ali'; SAVEPOINT add_money UPDATE accounts set balance = balance -4000 WHERE name = 'Vali' ; ROLLBACK TO add_mony;COMMIT;

SELECT * FROM accounts;


CREATE DATABASE Translatsiya,

use Translatsiya;


create table accounts(
    id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(55),
    balance DECIMAL(10,2)
);


INSERT INTO accounts(
    name ,
    balance)
VALUES
    ('Ali', 1000),
    ('Vali', 500);



ALTER TABLE accounts MODIFY balance DECIMAL(10,2) UNSIGNED;


ALTER TABLE accounts MODIFY balance DECIMAL(10,2);
DESC accounts;



--1 
START TRANSACTION; UPDATE accounts  SET balance = balance -300 WHERE name = 'Ali' AND balance >=300; UPDATE accounts SET balance = balance +300 WHERE name ='Vali';COMMIT;

SELECT * FROM accounts;


---2
START TRANSACTION; UPDATE accounts SET balance = balance - 5000 WHERE name ='Ali'; COMMIT;
SELECT * FROM accounts;


--3.1

START TRANSACTION; UPDATE accounts SET balance = balance +3000 WHERE name = 'Ali'; SAVEPOINT add_money UPDATE accounts set balance = balance -4000 WHERE name = 'Vali' ; ROLLBACK TO add_mony;COMMIT;

SELECT * FROM accounts;