CREATE TABLE encargados (
cedula_encargado VARCHAR(15) PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
telefono VARCHAR(15),
correo VARCHAR(50),
id_orden INT,
FOREIGN KEY (id_orden) REFERENCES Orden(id_orden) ON DELETE CASCADE ON UPDATE CASCADE
);