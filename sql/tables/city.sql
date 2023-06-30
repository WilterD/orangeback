CREATE TABLE city (
id_city INT,
name_city VARCHAR(50) NOT NULL,
id_states INT,

PRIMARY KEY (id_city),

FOREIGN KEY (id_states) REFERENCES states(id_states)
);