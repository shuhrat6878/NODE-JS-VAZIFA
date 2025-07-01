CREATE DATABASE IF NOT EXISTS n23;

show databases;
USE n23;
create table if not exists student(id int auto_increment primary key, name varchar(50), age int, group_name varchar(50));

show tables;
insert into student(name ,age, group_name) values ('Shuhrat',26,'A55'),('Suhrob',22,'B55'),('Atham',22,'A55'),('Dinmuhammad',19,'A55'),('Jamshid',30,'P55'),('Kamol',29,'K55'),('Javohir',29,'L55'),('Abbos',19,'A55'),('Fazliddin',29,'C55'),('Mirohun',20,'D55'),('Javohir',22,'A55'),('Jasur',21,'B55'),('Sardor',23,'A55'),('Anvar',24,'C55'),('Azizbek',20,'D55'),('Muhammad',22,'A55'),('Abdulaziz',21,'B55'),('Sardorbek',25,'A55'),('Daler',27,'C55'),('Ulugbek',28,'D55');

select * from student;
select name,age,group_name from student;
select * from student where age > 20;
select * from student where age < 25;

