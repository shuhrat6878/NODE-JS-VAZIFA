CREATE DATABASE  IF NOT EXISTS onlineKurslar;
USE onlineKurslar;

CREATE TABLE IF NOT EXISTS teachers (
    id int auto_increment primary key,full_name varchar(55), specialization varchar(55) NOT null 
);

CREATE TABLE IF NOT EXISTS courses (
    id int auto_increment primary key, title varchar(55), descriptionn TEXT,
    teachers_id int unique NOT null,
    foreign key (teachers_id) references teachers(id),
    price decimal(64,0)
);


CREATE TABLE IF NOT EXISTS students(
    id int auto_increment primary key,
    full_name varchar(55) NOT null,
    phone varchar(20) NOT null
);

CREATE TABLE IF NOT EXISTS enrollments(
    id int auto_increment primary key,
    students_id int NOT null,
    foreign key (students_id) references students(id),
    course_id int NOT null,
    foreign key (course_id) references courses(id),
    enrolled_at datetime
);

--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

INSERT INTO teachers (full_name, specialization) VALUES
('Ali Karimov', 'Matematika'),
('Dilfuza Xoliqova', 'Ingliz tili'),
('Shavkat Ergashev', 'Fizika'),
('Gulbahor Toshpulatova', 'Tarix'),
('Otabek Raximov', 'Biologiya');


-->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

INSERT INTO courses (title, descriptionn, teachers_id, price) VALUES
('Algebra Asoslari', 'Algebra asoslarini orgatuvchi kurs.', 1, 15000),
('Ingliz tili Boshlangich', 'Boshlangich darajada ingliz tili.', 2, 20000),
('Fizika Tajribalari', 'Amaliy fizika tajribalari.', 3, 18000),
('Orta asrlar Tarixi', 'Tarixiy davrlar va voqealarni orgatadi.', 4, 17000),
('Biologiya Asoslari', 'Biologiyaning asosiy tushunchalari.', 5, 19000);

--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


