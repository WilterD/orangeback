CREATE TABLE concesionarios (
rif_concesionario VARCHAR(20) NOT NULL PRIMARY KEY,
razon_social VARCHAR(50) NOT NULL,
nombre_concesionario VARCHAR(50) NOT NULL,
id_city int NOT NULL,
id_estado int NOT NULL,
cedula_encargado VARCHAR(15) NOT NULL,
FOREIGN KEY (cedula_encargado) REFERENCES encargados(cedula_encargado) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_city) REFERENCES cities(id_city) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado) REFERENCES estados(id_estado) ON DELETE CASCADE ON UPDATE CASCADE
);