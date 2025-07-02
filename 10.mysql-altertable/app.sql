CREATE DATABASE IF NOT EXISTS restoran;
USE restoran;

CREATE TABLE IF NOT EXISTS Mijozlar(id int auto_increment primary key, fullname varchar(50), phone varchar(15) unique);

CREATE TABLE IF NOT EXISTS Buyurtmalar(id int auto_increment primary key, customer_id int, foreign key(customer_id) references Mijozlar(id), order_date datetime, total_price decimal(10,2));

CREATE TABLE IF NOT EXISTS Menu(id int auto_increment primary key, nomi varchar(50) unique, price decimal(10,2));

CREATE TABLE IF NOT EXISTS Oreder_items(id int auto_increment primary key, order_id int, foreign key(order_id) references Buyurtmalar(id), menu_id int, foreign key(menu_id) references Menu(id), quantity int);


