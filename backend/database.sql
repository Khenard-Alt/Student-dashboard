-- Create MySQL Table
-- Run this in MySQL Workbench:

CREATE DATABASE dashboarddb;

USE dashboarddb;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100),
  year INT
);
