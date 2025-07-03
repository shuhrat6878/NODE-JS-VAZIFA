
create DATABASE IF NOT EXISTS Najot_Talim;
USE Najot_Talim;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    age INT CHECK (age <= 100),
    city_id INT
);


CREATE table IF NOT EXISTS cities(
    id int AUTO_INCREMENT PRIMARY key,
    city_name varchar(50) UNIQUE
);

INSERT INTO cities (city_name) VALUES
('Toshkent'),
('Samarqand'),
('Buxoro'),
('Andijon'),
('Namangan');

INSERT INTO users (name, age, city_id) VALUES
('Ali Valiyev', 25, 1),
('Dilfuza Karimova', 30, 2),
('Shavkat Ergashev', 28, 3),
('Malika Shukurova', 35, 4),
('Toshpolat', 34, 2),
('Ganisher', 34, 12),
('Ilyos Toshpolatov', 40, 5);


-- vazifalar join

select users.id,users.name, users.age, cities.city_name as city from users join cities on user.city_id = cities.id;

select users.id, users.name, users.age, cities.city_name from users LEFT JOIN cities ON users.city_id = cities.id;


SELECT cities.city_name, users.name, users.age, users.id from cities LEFT JOIN users on cities.id = users.city_id;


select cities.city_name, COUNT(users.id) as odam_soni from cities LEFT JOIN users ON cities.id = users.city_id GROUP BY cities.city_name;



SELECT cities.city_name,AVG(users.age) AS o_rta_yosh FROM cities LEFT JOIN users ON users.city_id = cities.id
GROUP BY cities.city_name;


SELECT users.name,users.age,cities.city_name
FROM users
JOIN cities ON users.city_id = cities.id
ORDER BY cities.city_name;



SELECT users.name,users.age,cities.city_name
FROM users
JOIN cities ON users.city_id = cities.id
WHERE cities.city_name = 'Toshkent';



SELECT cities.city_name,SUM(users.age) AS yosh_yigindisi
FROM cities
LEFT JOIN users ON users.city_id = cities.id
GROUP BY cities.city_name;



SELECT cities.city_name,COUNT(users.id) AS foydalanuvchi_soni
FROM cities
LEFT JOIN users ON users.city_id = cities.id
GROUP BY cities.city_name
HAVING COUNT(users.id) > 1;

--- where

SELECT * from users where age=25;


SELECT * FROM users where city_id !=1;

SELECT * FROM users where city_id !=1 AND city_id !=2;


SELECT * FROM users where city_id !=3;


SELECT* FROM users WHERE age BETWEEN 20 and 30;
