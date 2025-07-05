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
    price DECIMAL(10,2),
    stock_qty int
);


CREATE TABLE IF not EXISTS orders(
    id int AUTO_INCREMENT PRIMARY key,
    customer_id int not null,
    FOREIGN key (customer_id) REFERENCES customers(id),
    order_date DATETIME
);

CREATE TABLE if NOT EXISTS order_items(
    id int AUTO_INCREMENT PRIMARY KEY,
    order_id int not null,
    foreign KEY (order_id) REFERENCES orders(id),
    praduct_id int not null,
    FOREIGN key (praduct_id) REFERENCES products(id),
    quantity int not null
);


-- 1 ga
INSERT INTO customers (full_name, phone, city) VALUES
('Ali Valiyev', '998901234567', 'Toshkent'),
('Dilnoza Karimova', '998911234567', 'Samarqand'),
('Rustam Toshpolatov', '998931234567', 'Farg‘ona'),
('Nodira Abdullaeva', '998941234567', 'Buxoro'),
('Jasur Bekmurodov', '998951234567', 'Namangan');

-- 2 ga
INSERT INTO products (title, price, stock_qty) VALUES
('Noutbuk', 850.00, 10),
('Smartfon', 500.00, 25),
('Televizor', 1200.00, 5),
('Muzlatgich', 900.00, 7),
('Kir yuvish mashinasi', 750.00, 8);

-- 3 ga 
INSERT INTO orders (customer_id, order_date) VALUES
(1, '2025-07-01'),
(2, '2025-07-02'),
(3, '2025-07-03'),
(4, '2025-07-03'),
(5, '2025-07-04');

-- 4 ga
INSERT INTO order_items (order_id, praduct_id, quantity) VALUES
(1, 1, 1),
(1, 2, 2),
(2, 3, 1),
(3, 5, 1),
(4, 4, 1);



--select 1

SELECT  customers.full_name, COUNT(orders.id) as order_count
from customers
LEFT JOIN orders
on customers.id = orders.customer_id
GROUP BY customers.id, customers.full_name;


--- select 2

