CREATE DATABASE if not EXISTS Dokon;
USE Dokon;

create TABLE IF NOT EXISTS customers(
    id int AUTO_INCREMENT PRIMARY key,
    full_name varchar(50) NOT null ,
    phone VARCHAR (50) NOT null UNIQUE,
    city VARCHAR(30) not null
);

CREATE TABLE IF NOT EXISTS products(
    id int AUTO_INCREMENT PRIMARY key,
    title VARCHAR(30) not null,
    price DECIMAL(10,2), not null,
    stock_qty int
);


CREATE TABLE IF not EXISTS orders(
    id int AUTO_INCREMENT PRIMARY key,
    customer_id int not null,
    FOREIGN key (customer_id) REFERENCES customers(id),
    order_date data
);

CREATE TABLE if NOT EXISTS order_items(
    id int AUTO_INCREMENT PRIMARY KEY,
    order_id int not null,
    praduct_id int not null,
    quantity int not null,
    foreign KEY (order_id) REFERENCES orders(id),
    FOREIGN key (praduct_id) REFERENCES products(id)
);

