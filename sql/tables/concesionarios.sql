CREATE TABLE concesionarios (
rif_concesionario VARCHAR(20) NOT NULL PRIMARY KEY,
razon_social VARCHAR(50) NOT NULL,
nombre_concesionario VARCHAR(50) NOT NULL,
id_city int NOT NULL,
dni_encargado VARCHAR(15) NOT NULL,
FOREIGN KEY (dni_encargado) REFERENCES encargados(dni_encargado) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_city) REFERENCES cities(id_city) ON DELETE CASCADE ON UPDATE CASCADE
);