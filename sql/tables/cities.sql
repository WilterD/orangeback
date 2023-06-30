CREATE TABLE cities (
id_city INT PRIMARY KEY,
name_city VARCHAR(50) NOT NULL,
id_states INT,
FOREIGN KEY (id_states) REFERENCES states(id_states)
);