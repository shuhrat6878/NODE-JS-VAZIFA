CREATE DATABASE IF NOT EXISTS Restoran;
USE Restoran;

CREATE TABLE IF NOT EXISTS Mijozlar(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(50),
    phone VARCHAR(15) UNIQUE
);

CREATE TABLE IF NOT EXISTS Buyurtmalar(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES Mijozlar(id),
    order_date DATETIME,
    total_price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Menu(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomi VARCHAR(50) UNIQUE,
    price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS Order_Items(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    FOREIGN KEY(order_id) REFERENCES Buyurtmalar(id),
    menu_id INT,
    FOREIGN KEY(menu_id) REFERENCES Menu(id),
    quantity INT
);

INSERT INTO Mijozlar(fullname, phone) VALUES
('Anorboyev Shuhrat', '+998944657843'),
('Yoldashev Otabek', '+998943214345'),
('Xursonaliyev Samandar', '+998944108994'),
('Aziz Xusniddinov', '+998944103456'),
('Odil Tolqinov', '+998944109875');

INSERT INTO Menu(nomi,price) VALUES
('osh', 28000),
('lagmon', 34000),
('norin', 21000),
('somsa', 12000),
('shorva', 22000),
('dimlama', 19000);

INSERT INTO Buyurtmalar(customer_id, order_date, total_price) VALUES
(1,'2025-06-23 11:30:05', 54000),
(3,'2025-06-23 12:30:06', 34000),
(1,'2025-06-23 15:30:08', 45000),
(4,'2025-06-23 12:30:00', 23000),
(2,'2025-06-23 13:30:09', 35000);

INSERT INTO Order_Items(order_id, menu_id, quantity) VALUES
(1,1,1),
(1,2,1),
(2,3,2),
(3,4,3),
(4,5,1),
(5,6,2);


SELECT *
FROM Mijozlar
ORDER BY fullname ASC;


SELECT
    M.fullname,
    COUNT(B.id) AS buyurtmalar_soni
FROM
    Mijozlar M
    JOIN Buyurtmalar B ON M.id = B.customer_id
GROUP BY
    M.id
ORDER BY
    buyurtmalar_soni DESC
LIMIT 1;


SELECT * FROM Buyurtmalar
ORDER BY order_date DESC
LIMIT 5;

SELECT
    M.fullname,
    SUM(B.total_price) AS jami_sarflangan
FROM
    Mijozlar M
    JOIN Buyurtmalar B ON M.id = B.customer_id
GROUP BY
    M.id
ORDER BY
    jami_sarflangan DESC;


SELECT
    Mijozlar.fullname,
    Buyurtmalar.id AS buyurtma_id,
    Menu.nomi AS taom_nomi,
    Order_Items.quantity
FROM
    Order_Items
    JOIN Buyurtmalar ON Order_Items.order_id = Buyurtmalar.id
    JOIN Mijozlar ON Buyurtmalar.customer_id = Mijozlar.id
    JOIN Menu ON Order_Items.menu_id = Menu.id
ORDER BY
    Mijozlar.fullname,
    Buyurtmalar.id;


