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

SELECT 
    o.id AS order_id,
    p.title AS product_title,
    oi.quantity
FROM 
    orders o
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.praduct_id = p.id
ORDER BY 
    o.id;


--select 3

SELECT
    p.title AS product_title,
    SUM(oi.quantity) AS total_ordered
FROM
    order_items oi
INNER JOIN products p ON oi.praduct_id = p.id
GROUP BY
    p.id, p.title
ORDER BY
    total_ordered DESC
LIMIT 3;


--select 4

SELECT
    id,
    title,
    stock_qty
FROM
    products
WHERE
    stock_qty = 0;

UPDATE products SET stock_qty = 0 WHERE id = 3;


--update

UPDATE customers
SET city = 'Andijon'
WHERE id = 1;

UPDATE products
SET price = 950.00
WHERE id = 3;

--delete

SELECT CONSTRAINT_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_NAME = 'order_items'
  AND COLUMN_NAME = 'praduct_id'
  AND CONSTRAINT_SCHEMA = 'Dokon';

ALTER TABLE order_items
DROP FOREIGN KEY order_items_ibfk_2;


--altertable

ALTER TABLE customers
ADD COLUMN email VARCHAR(100);

ALTER TABLE products
ADD COLUMN category VARCHAR(50);

--join

SELECT
    c.full_name,
    o.id AS order_id,
    p.title AS product_title,
    oi.quantity
FROM
    customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.praduct_id = p.id
ORDER BY
    c.full_name, o.id;

---join2

SELECT
    c.full_name,
    o.id AS order_id,
    o.order_date
FROM
    customers c
LEFT JOIN orders o ON c.id = o.customer_id
ORDER BY
    c.full_name;

--join3

SELECT
    o.id AS order_id,
    o.order_date,
    c.full_name
FROM
    orders o
RIGHT JOIN customers c ON o.customer_id = c.id
ORDER BY
    order_id;

--join4

SELECT
    c.id,
    c.full_name,
    c.city
FROM
    customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE
    o.id IS NULL;


--cros join
\SELECT 
    c.full_name,
    p.title AS product_title
FROM 
    customers c
CROSS JOIN 
    products p
ORDER BY 
    c.full_name, p.title;

--group by

SELECT 
    c.full_name,
    SUM(p.price * oi.quantity) AS total_spent
FROM 
    customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.praduct_id = p.id
GROUP BY 
    c.id, c.full_name
HAVING 
    total_spent > 500000;


--union

SELECT full_name, city FROM customers WHERE city = 'Toshkent'
UNION
SELECT full_name, city FROM customers WHERE city = 'Andijon';

SELECT full_name, city FROM customers WHERE city = 'Toshkent'
UNION ALL
SELECT full_name, city FROM customers WHERE city = 'Andijon';


--as

SELECT 
    c.full_name,
    SUM(p.price * oi.quantity) AS total_spent
FROM 
    customers c
INNER JOIN orders o ON c.id = o.customer_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.praduct_id = p.id
GROUP BY 
    c.id, c.full_name;

