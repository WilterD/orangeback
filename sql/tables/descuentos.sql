CREATE TABLE descuentos (
id_descuento INT PRIMARY KEY,
services_min INT,
services_max INT,
porcentaje FLOAT,
rif_concesionario VARCHAR(15),
FOREIGN KEY (rif_concesionario) REFERENCES concesionarios(rif_concesionario) ON DELETE CASCADE ON UPDATE CASCADE
);