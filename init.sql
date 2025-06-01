CREATE DATABASE IF NOT EXISTS todos;

USE todos;

CREATE TABLE IF NOT EXISTS todo_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,    -- Die Spalte 'name' wird verwendet, nicht 'task'
    completed BOOLEAN NOT NULL DEFAULT FALSE
);
