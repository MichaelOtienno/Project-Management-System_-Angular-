create database Students

create table students (
    studentID int identity(1,1) primary key,
    name VARCHAR(250) not null,
    password VARCHAR(250) not null,
    email varchar(250) not null
    
)