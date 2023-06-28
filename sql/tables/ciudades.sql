CREATE TABLE ciudades (
id_ciudad INT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
id_estado INT,
FOREIGN KEY (id_estado) REFERENCES estados(id_estado)
);