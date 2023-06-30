CREATE TABLE cities (
id_city INT PRIMARY KEY,
name_city VARCHAR(50) NOT NULL,
id_state INT,
FOREIGN KEY (id_state) REFERENCES state(id_state)
);