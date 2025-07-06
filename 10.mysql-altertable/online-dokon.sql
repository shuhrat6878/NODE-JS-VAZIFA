CREATE DATABASE IF NOT EXISTS Online_Dokon;
USE Online_Dokon;


CREATE TABLE IF NOT EXISTS Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    city VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

CREATE TABLE IF NOT EXISTS OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE INDEX idx_orders_customer ON Orders(customer_id);
CREATE INDEX idx_orderitems_order ON OrderItems(order_id);
CREATE INDEX idx_products_category ON Products(category);

INSERT INTO Customers (full_name, phone, city) VALUES
('Ali Valiyev', '+998901234567', 'Toshkent'),
('Gulnoza Karimova', '+998909876543', 'Andijon'),
('Sherzod Bekmurodov', '+998933456789', 'Farg‘ona'),
('Malika Rustamova', '+998935555555', 'Samarqand');


INSERT INTO Products (name, price, category) VALUES
('Noutbuk Lenovo', 7500000, 'Elektronika'),
('Smartfon Samsung', 5500000, 'Elektronika'),
('Ofis stoli', 1200000, 'Mebel'),
('Stul', 400000, 'Mebel'),
('Sovutkich Artel', 6700000, 'Maishiy texnika'),
('Mikrotolqinli pech', 950000, 'Maishiy texnika');

INSERT INTO Orders (customer_id, order_date) VALUES
(1, '2025-07-01 10:30:00'),
(1, '2025-07-02 14:10:00'),
(2, '2025-07-03 09:45:00'),
(3, '2025-07-04 16:00:00'),
(4, '2025-07-05 11:20:00');

INSERT INTO OrderItems (order_id, product_id, quantity) VALUES
(1, 1, 1), 
(1, 4, 2), 
(2, 2, 1), 
(3, 3, 1), 
(3, 4, 1), 
(4, 5, 1), 
(5, 6, 1); 

--1
SELECT c.full_name, COUNT(o.id) AS total_orders
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY total_orders DESC
LIMIT 1;


--2

SELECT city,
       (SELECT COUNT(*)
         FROM Orders o
         WHERE o.customer_id IN (
           SELECT id FROM Customers c2 WHERE c2.city = c1.city
         )) / COUNT(DISTINCT id) AS avg_orders_per_customer
FROM Customers c1
GROUP BY city;


--3

SELECT *
FROM Customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM Orders o
    WHERE o.customer_id = c.id
);


--4

SELECT p.name,
       SUM(p.price) AS total_revenue
FROM OrderItems oi
JOIN Products p ON oi.product_id = p.id
WHERE oi.quantity = 1
GROUP BY p.id
ORDER BY total_revenue DESC
LIMIT 1;

--5

SELECT p.*
FROM OrderItems oi
JOIN Products p ON oi.product_id = p.id
WHERE oi.order_id = (
    SELECT id FROM Orders
    ORDER BY order_date DESC
    LIMIT 1
);


--6

SELECT *
FROM Products
WHERE price > (
    SELECT AVG(price) FROM Products
);

--7 
SELECT *
FROM Products
ORDER BY price DESC
LIMIT 1 OFFSET 1;


--8

SELECT DISTINCT oi.product_id
FROM OrderItems oi
WHERE NOT EXISTS (
    SELECT 1
    FROM Products p
    WHERE p.id = oi.product_id
);

--index
--9

SELECT * FROM Orders
WHERE order_date BETWEEN '2025-07-01' AND '2025-07-05';

SELECT * FROM Orders
ORDER BY order_date DESC
LIMIT 10;


--10

SELECT * FROM Products
WHERE category = 'Elektronika';


EXPLAIN SELECT * FROM Products WHERE category = 'Elektronika';

EXPLAIN SELECT * FROM Products WHERE category = 'Elektronika';

--11

SELECT * FROM OrderItems
WHERE product_id = 2;

EXPLAIN SELECT * FROM OrderItems WHERE product_id = 2;

CREATE INDEX idx_orderitems_product_id ON OrderItems(product_id);

EXPLAIN SELECT * FROM OrderItems WHERE product_id = 2;
