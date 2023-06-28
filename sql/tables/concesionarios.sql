CREATE TABLE concesionarios (
rif_concesionario VARCHAR(20) NOT NULL,
nombre_concesionario VARCHAR(50) NOT NULL,
id_ciudad int NOT NULL,
id_estado int NOT NULL,
id_encargado INT NOT NULL,
razon_social VARCHAR(50) NOT NULL,
PRIMARY KEY (rif_concesionario),
FOREIGN KEY (id_encargado) REFERENCES Personal(id_personal) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_ciudad) REFERENCES ciudades(id_ciudad) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (id_estado) REFERENCES estados(id_estado) ON DELETE CASCADE ON UPDATE CASCADE
);